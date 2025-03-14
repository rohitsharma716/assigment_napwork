const express  = require('express')
const router = express.Router();
const User   = require('../models/user')
const Posts  = require('../models/posts')
const {generateToken , jwtAuthMiddleware }= require('../jwt')
const bcrypt = require('bcrypt');


router.post('/signup', async(req , res) =>{
     
    try{
      
         const data = req.body;
        const existingMail =  await User.findOne({email: data.email });
        if(existingMail){
              return res.status(400).json({error:'Mail is already exists'})
        }
        console.log('before the data')
        const newUser = new User(data);
        const reponse = await newUser.save();
        
        console.log("data saved");
        
        //  need to write code for genrate token.
        const payload ={ id:reponse.id};
        const  token = generateToken(payload);


        res.status(200).json({user : reponse, token})


        
    }catch(err){
         console.log('Error during signup: ' , err.message);
         res.status(500).json({erro : ' Internal Server Error'})
    }

})

router.post('/login', async(req,res) =>{
      
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "User email is not registered" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: "wrong password" });
        }
    
        const payload = { id: user._id };
        const token = generateToken(payload);
    
        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
})

router.post('/posts' ,jwtAuthMiddleware,   async (req,res) =>{
         
    try{
        // most complex part for me..  but i take help of AI(chatGPT).
        const data = req.body;
        const newPost = new Posts({
            ...data,
            userId: req.user.id 
          });
        // const newPost  =  new Posts(data);
        const response =  await newPost.save();
        console.log("post is saved");
        res.status(200).json({response})

    }catch(err){
        console.log('error in post route:',  err);
        res.status(5000).json({error:  "Internal server error"})
         
    }
})

router.get('/posts' ,async (req,res) =>{
     
    try{
        const posts =  await Posts.find();
        const allPosts =  posts.map((data) =>{
             
        })


    }catch(err){
          console.log("error in fatching posts",  err)
          res.status(5000).json({error : " internal server error"})
    }

})


module.exports = router;