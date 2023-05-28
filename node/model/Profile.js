const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    // create reference to user model
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'        
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    position:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true
    },
    bio:{
        type: String
    },
    github:{
        type: String
    },
    experience: [
        {
            title:{
                type: String,
                required: true
            },
            company:{
                type:String,
                required: true
            },
            location:{
                type: String
            },
            from:{
                type:String,
                required: true
            },
            to:{
                type: String
            },
            current:{
                type: Boolean
            },
            desc:{
                type: String
            },
            index:{
                type: Number
            }
        }
    ],
    education:[
        {
            school:{
                type:String,
                required: true
            },
            degree:{
                type: String,
                required: true
            },
            field:{
                type: String,
                required: true
            },
            location:{
                type: String,
                required: true
            },
            from:{
                type:String,
                required: true
            },
            to:{
                type: String
            },
            current:{
                type: Boolean
            },
            desc:{
                type: String
            },
            index:{
                type: Number
            }
        }
    ],
    social:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        linkedin:{
            type:String
        }
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', profileSchema);