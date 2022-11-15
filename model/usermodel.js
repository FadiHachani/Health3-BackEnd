const mongoose = require ("mongoose")
const Joi = require ("joi")
const config=require('config'); 

const jwt=require('jsonwebtoken')

const schema_user = mongoose.Schema({
    nom:{type: String,required: true},
    email:{type: String,required: true},
    user_name:{type: String,required: true},
    password:{type: String,required: true},
    profile_pic:[String]

})

schema_user.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token ; 
}


const USER = mongoose.model('USER',schema_user)


function validateUser(user){

    schema = {
    nom:Joi.string().required(),
    email:Joi.string().email().required(),
    user_name:Joi.string().required(),
    password:Joi.string().required(),
    profile_pic:Joi.array().items(Joi.string().required())
    }

    return Joi.validate(user,schema)
}
function validateAuthUser(user){

    schema = {
    user_name:Joi.string().required(),
    password:Joi.string().required()
    }

    return Joi.validate(user,schema)
}

module.exports.validateAuthUser = validateAuthUser
module.exports.USER = USER
module.exports.validateUser = validateUser