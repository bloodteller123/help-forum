const express = require('express');
const auth = require('../middleware/auth');
const Profile = require('../model/Profile');
const User = require('../model/User');
const {validationResult, body} = require('express-validator');
const { default: axios } = require('axios')
const router = express.Router();

require('dotenv').config()

router.get('/me', auth, async (req, res) =>{
    try {
        // https://mongoosejs.com/docs/api/model.html#Model.findOne()
        //https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean
        // console.log(req)
        const profile = await Profile.findOne({user: req.id}).populate('user', ['name']);

        if(!profile){
            return res.status(400).json("error profile")
        }
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json("DB error")
    }
})

router.get('/profilesList', async (req, res) =>{
    try {
        // https://mongoosejs.com/docs/api/model.html#Model.findOne()
        //https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean
        const profiles = await Profile.find().populate('user', {name:1, email:1});

        if(!profiles){
            return res.status(400).json("error profiles")
        }
        res.json(profiles);
    } catch (error) {
        console.log(error);
        res.status(500).json("DB error")
    }
})

router.get('/:user_id', async (req, res) =>{
    try {
        // https://mongoosejs.com/docs/api/model.html#Model.findOne()
        //https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', {name:1, email:1});

        if(!profile){
            return res.status(400).json("error profile");
        }
        console.log(profile)
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json("Profile not found");
    }
})

// create/ update
router.post('/', [auth, [
    body('position').notEmpty(),
    body('skills').notEmpty(),
    ]], async (req, res) =>{
        const results = validationResult(req);
        // console.log(results);
        if(!results.isEmpty()) return res.status(400).json({error: results.errors});
        let data = {...req.body}
        data.skills = data.skills.split(',').map(s => s.toUpperCase())
        console.log(data)
        console.log(req.id)
// https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
// https://mongoosejs.com/docs/api/query.html#Query.prototype.findOneAndUpdate()
        let options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true };
//https://www.mongodb.com/docs/manual/reference/operator/update/positional/?_ga=2.51772522.2126321993.1684267590-44177539.1684267452
        let doc = await Profile.findOneAndUpdate({user: req.id}, {$set: data}, options);
        console.log(doc);
        res.json(doc);
    }
)

router.put('/addExp', [auth, [
    body('title').notEmpty(),
    body('company').notEmpty(),
    body('from').notEmpty()
]], async (req, res) =>{

    const results = validationResult(req);
    // console.log(results);
    if(!results.isEmpty()) return res.status(400).json({error: results.errors});

    // let {
    //     title, company, location, from, to, current, desc
    // } = req.body
    
    const exp = req.body;
    console.log(exp);
    try {
        let options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true };
        // https://stackoverflow.com/questions/32129722/pushing-into-an-array-inside-of-a-mongoose-object
        const profile = await Profile.findOneAndUpdate({user:req.id}, {$push: {"experience": exp}}, options);

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.put('/addEdu', [auth, [
    body('school').notEmpty(),
    body('degree').notEmpty(),
    body('field').notEmpty(),
    body('location').notEmpty(),
    body('from').notEmpty()
]], async (req, res) =>{

    const results = validationResult(req);
    console.log(results);
    if(!results.isEmpty()) return res.status(400).json({error: results.errors});

    // let {
    //     title, company, location, from, to, current, desc
    // } = req.body
    
    const edu = req.body;
    console.log(edu);
    try {
        let options = { upsert: true, returnOriginal: false, setDefaultsOnInsert: true };
        // https://stackoverflow.com/questions/32129722/pushing-into-an-array-inside-of-a-mongoose-object
        const profile = await Profile.findOneAndUpdate({user:req.id}, {$push: {"education": edu}}, options);

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

// You should use findOneAndDelete() unless you have a good reason not to.

router.delete('/deleteExp/:exp_id', auth, async (req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.id});
        profile.experience = profile.experience.filter(item => item.id != req.params.exp_id);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json("Experience not found");
    }
})

router.delete('/deleteEdu/:edu_id', auth, async (req, res) =>{
    try {
        console.log(req)
        const profile = await Profile.findOne({user: req.id});
        console.log(profile)
        profile.education = profile.education.filter(item => item.id != req.params.edu_id);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json("Experience not found");
    }
})

router.get('/github/:name', async (req, res) =>{
    try {
        const client = process.env.githubClient;
        const secret = process.env.githubSecret;

        axios.get(`https://api.github.com/users/${req.params.name}/repos?per_page=5&sort=created:asc`, {
            headers: {
              Accept: 'application/vnd.github+json'
            }
        }).then(data => {
            // console.log(data)
            res.json({repo:data.data})
        }).catch(error =>{
            console.log(error)
            res.status(404).json("not found")
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error")
    }
})

module.exports = router;