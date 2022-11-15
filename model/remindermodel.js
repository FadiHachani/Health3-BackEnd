const mongoose = require ("mongoose")
const Joi = require ("joi")

const USER = require('./usermodel')


const schema_reminder = mongoose.Schema({
    medName:{type: String,required: true},
    medType:{type: String,required: true},
    medDose:{type: Number,required: true},
    remindTime:{type: Number,required: true},
    user:{type: mongoose.Schema.Types.ObjectId,ref:'USER'},
    startTime:{type: Date,required: true},
    next:{type: Number,required: true},
})

const REMINDERUSER = mongoose.model('REMINDERUSER',schema_reminder)


function validateReminder(reminder){

    schema = {
    medName:Joi.string().required(),
    medType:Joi.string().required(),
    medDose:Joi.number().required(),
    remindTime:Joi.number().required(),
    startTime:Joi.date().required(),
    next:Joi.number().required(),
    }

    return Joi.validate(reminder,schema)
}


module.exports.validateReminder = validateReminder
module.exports.REMINDERUSER = REMINDERUSER

