const mongoose = require ("mongoose")
const Joi = require ("joi")

const USER = require('./usermodel')



const schema_post = mongoose.Schema({
    desc:{type: String,required: true},
    postPic:{type: String,required: true},
    user:{type: mongoose.Schema.Types.ObjectId,ref:'USER'},
    
})



const POSTUSER = mongoose.model('POSTUSER',schema_post)



function validatePost(post){

    schema = {
    desc:Joi.string().required(),
    postPic:Joi.string().required()
    }

    return Joi.validate(post,schema)
}


module.exports.validatePost = validatePost
module.exports.POSTUSER = POSTUSER
