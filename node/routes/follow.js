const express = require('express')
const router = express.Router();

const Follower = require('../model/Follower')
const auth = require('../middleware/auth')
const {validationResult, body} = require('express-validator');

router.get('/followings', auth, async (req, res) =>{
    try {
        console.log(req.id)
        let followings = await Follower.find({slave:req.id}).populate('master', {name:1, email:1})
        console.log(followings)
        return res.json(followings)
    } catch (error) {
        console.log(error);
        return res.status(500).json({e: error})
    }
})

router.get('/followers', auth, async (req, res) =>{
    try {
        let followers = await Follower.find({master:req.id}).populate('slave', {name:1, email:1})
        console.log(followers)
        return res.json(followers)
    } catch (error) {
        console.log(error);
        return res.status(500).json({e: error})
    }
})

// follow
router.post('/', [auth, body('id').notEmpty()], async (req, res) =>{
    try {
        console.log(req.body)
        let follower = new Follower({
            master: req.body.id,
            slave: req.id
        });

        follower = await follower.save()
        console.log(follower)
        follower = await follower.populate([{path: 'master', select: {name:1, email:1}}, 
                                            {path: 'slave', select: {name:1, email:1}}]);
        return res.json(follower)
    } catch (error) {
        console.log(error);
        return res.status(500).json({e: error})
    }
})

// unfollow
router.delete('/unfollow/:master_id', auth, async (req, res) =>{
    try {
        // console.log(req.body)
        let follower = await Follower.findOne({master: req.params.master_id, slave: req.id});
        // let x = await Follower.find();
        // console.log(x);
        if(!follower) return res.status(400).json('Relations not exist');

        let deletedEntity = await Follower.findOneAndDelete({master: req.params.master_id, slave: req.id})
                                            .populate('master', {name:1, email:1});

        return res.json(deletedEntity)
    } catch (error) {
        console.log(error);
        return res.status(500).json({e: error})
    }
})

module.exports = router;