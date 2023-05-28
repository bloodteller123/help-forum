const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    upvotes: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    downvotes: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            text:{
                type:String,
                required: true
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Post = new mongoose.model('post', postSchema);