const mongoose = require('mongoose')
const followerSchema = new mongoose.Schema({
    master:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    slave:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})
// https://stackoverflow.com/questions/36822937/purpose-of-index-in-mongoose-schema
followerSchema.index({master:1, slave:1}, {unique: true})
module.exports = Follower = new mongoose.model('follower', followerSchema)