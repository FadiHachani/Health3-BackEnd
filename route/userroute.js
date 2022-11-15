const {validateUser,USER,validateAuthUser} = require ('../model/usermodel')
const express = require ('express')
const multer = require('multer')
const router = express.Router()
const bcrypt = require ('bcrypt')
const authMidleWare = require('../MidleWare/authMidleWare')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

  var upload = multer({ storage: storage })
  router.post('/upload',upload.array('myFiles'),async(req,res)=>{
    const files = req.files
    let arr=[];
 files.forEach(element => {
    

  
      arr.push("http://172.20.10.5:3000/"+element.path)
 
   })
   console.log(arr)
  return res.send(arr)
})


router.post('/newUser',async(req,res)=>{

    const {error}= validateUser(req.body)
    if (error){res.send({status:false,message:error.details[0].message})}



    const user = new USER({
        nom: req.body.nom,
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password,
        profile_pic: req.body.profile_pic
    }) 

    const salt=await bcrypt.genSalt(10);

    user.password=await bcrypt.hash(user.password,salt);
    const result= await user.save();
    console.log(result);
    res.send({status:true,resultat:result})

})

router.post('/authUser',async(req,res)=>{

    const {error}= validateAuthUser(req.body)
    if (error){res.send({status:false,message:error.details[0].message})}

    const isExist=await USER.findOne({user_name:req.body.user_name});
    if(!isExist) return res.send({status:false,message:'Invalid USerName or password '});

    const validPassword=await bcrypt.compare(req.body.password,isExist.password);
    if(!validPassword) return res.send({status:false,resultat:'Invalid USerName or password '});


    const token =isExist.generateAuthToken();
    console.log(token);
    return res.header('x-token',token).send({status:true,resultat:token})



})

router.get('/CurrentUser',authMidleWare,async(req,res)=>{
   
    console.log(req.user._id)
  
    const result=await USER.findById(req.user._id).select("-password");
    console.log(result);
   return  res.send({status:true,resultat:result});
  
})

module.exports.routeUser=router