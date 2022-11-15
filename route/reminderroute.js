const express = require ('express')
const router = express.Router()
const authMidleWare = require('../MidleWare/authMidleWare')
const { validateReminder,REMINDERUSER } = require('../model/remindermodel')


router.post('/newReminder',authMidleWare, async(req,res)=>{

    const {error}= validateReminder(req.body)
    if (error){res.send({status:false,message:error.details[0].message})}
   const reminder = new REMINDERUSER({
    medName:req.body.medName,
    medType:req.body.medType,
    medDose:req.body.medDose,
    remindTime:req.body.remindTime,
    startTime:req.body.startTime,
     next:0,
    user:req.user._id,
    
   }) 
   const result= await reminder.save();
   res.send({status:true,resultat:result})

})

router.delete('/deleteReminder/:id',authMidleWare, async(req,res)=>{

   await REMINDERUSER.findByIdAndDelete(req.params.id).then(res.send({status:true})).catch(res.send({status:false}))

})

router.get('/allReminder',authMidleWare,async(req,res)=>{
  console.log(req.user._id)
    const result=await REMINDERUSER.find({user:req.user._id})
    res.send({status:true,resultat:result})

})

router.put('/setReminder/:id',authMidleWare,async(req,res)=>{
   console.log(req.user._id)
   const result=await REMINDERUSER.findByIdAndUpdate({_id:req.params.id}
      ,{$set:{next:req.body.next}},{new:true}
      
      )
    res.send({status:true,resultat:result})
 
 })

module.exports.routeReminder=router