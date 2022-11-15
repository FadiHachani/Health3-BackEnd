const {validateUser,USER,validateAuthUser} = require ('../model/usermodel')
const express = require ('express')
const multer = require('multer')
const router = express.Router()
const authMidleWare = require('../MidleWare/authMidleWare')
const { validatePost,POSTUSER } = require('../model/postmodel')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'posts')
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





router.post('/newPost',authMidleWare, async(req,res)=>{

    const {error}= validatePost(req.body)
    if (error){res.send({status:false,message:error.details[0].message})}

   const post = new POSTUSER({
     desc:req.body.desc,
     postPic:req.body.postPic,
     user:req.user._id,
    
   }) 
   const result= await post.save();
   res.send({status:true,resultat:result})

})

router.delete('/deletePost/:id',authMidleWare, async(req,res)=>{

   await POSTUSER.findByIdAndDelete(req.params.id)
   .then(result=>{
console.log(result)
    res.send({status:true})
   }
       
  )
   .catch(res.send({status:false}))

})

router.get('/allPost',authMidleWare,async(req,res)=>{
  
    await POSTUSER.find()
    .populate('user',"profile_pic nom")
    .then(result=>{
        console.log(result)
        res.send({status:true,resultat:result})
    }).catch(err=>{res.send({status:false,message:"there are no post"})})
})

module.exports.routePost=router