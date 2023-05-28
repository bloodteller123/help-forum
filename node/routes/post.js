const express = require('express');
const Post = require('../model/Post')
const auth = require('../middleware/auth');
const Profile = require('../model/Profile');
const User = require('../model/User');
const {validationResult, body} = require('express-validator');
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        // console.log(req)
        // https://stackoverflow.com/questions/59859953/how-to-fetch-documents-from-the-mongodb-collection-in-parts-for-loading-by-scrol
        const PAGE_SIZE = 5;
        const posts = await Post.find()
            .skip(req.query.batch * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .populate('user', ['name']);

        res.json({posts, batch:req.query.batch});

    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.get('/:post_id', async (req, res)=>{
    try {
        const post = await Post.findOne({_id:req.params.post_id}).populate('user', ['name']);
        if(!post) return res.status(404).json('post not found')
        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.post('/', [auth, 
    body('text').notEmpty()], async (req, res) =>{
    const results = validationResult(req);
    if(!results.isEmpty()) return res.status(400).json('request body error')
    
    try {
        const newPost = {
            text: req.body.text,
        }
        let post = new Post({
            ...newPost,
            user: req.id
        });

        let val = await post.save();
        val = await val.populate('user', ['name']);
        res.json({post: val})
    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.post('/comment/:id', [auth, body('text').notEmpty()], async (req, res) =>{
    const results = validationResult(req);
    if(!results.isEmpty()) return res.status(400).json('request body error')
    
    try {
        let post = await Post.findOne({_id: req.params.id});
        const comment = {
            text: req.body.text,
            user: req.id
        }
        
        post.comments.push(comment);
        post = await post.save();
        console.log(post)
        post = await post.populate('user', ['name']);
        console.log(post)

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.put('/upvote/:post_id', auth, async (req, res)=>{
    try {
        let post = await Post.findOne({_id:req.params.post_id});
        let upvotes = post.upvotes.filter(uv => uv.user.toString() === req.id);
        if(upvotes?.length > 0) return res.status(400).json("already upvoted");

        post.downvotes = post.downvotes.filter(dv=>dv.user.toString()!==req.id);
        post.upvotes.push({user: req.id});
        post = await post.save();
        post = await post.populate('user', ['name']);
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.put('/downvote/:post_id', auth, async (req, res)=>{
    try {
        let post = await Post.findOne({_id:req.params.post_id});
        let downvotes = post.downvotes.filter(uv => uv.user.toString() === req.id);
        if(downvotes?.length > 0) return res.status(400).json("already downvoted");

        post.upvotes = post.upvotes.filter(uv=>uv.user.toString()!==req.id);
        post.downvotes.push({user: req.id});
        post = await post.save();
        post = await post.populate('user', ['name']);

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.delete('/:post_id', auth, async (req, res)=>{
    try {
        let post = await Post.findOne({_id:req.params.post_id}).populate('user', ['name','_id']);
        if(!post) return res.status(404).json('post not found');
        if(post.user._id.toString() !== req.id.toString()){
            return res.status(401).json('unauthorized access');
        }
        post = await Post.findOneAndDelete({_id:req.params.post_id});
        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})

router.delete('/:post_id/:comment_id', auth, async (req, res)=>{
    try {
        let post = await Post.findOne({_id:req.params.post_id}).populate('user', ['name','_id']);
        if(!post) return res.status(404).json('post not found');
        if(post.user._id.toString() !== req.id.toString()){
            return res.status(401).json('unauthorized access');
        }

        post.comments = post.comments.filter(comment => (comment.id.toString() !== req.params.comment_id 
                        || comment.user.toString() !== req.id));

        await post.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json('Server err')
    }
})
module.exports = router;