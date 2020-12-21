const express =require('express');
const User=require('../models/user');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt=require("bcrypt")
const  isAuth =require('../middlewares/UserLoggedIn');
const isAdmin =require('../middlewares/IsAdmin');
const { getMaxListeners } = require('../models/user');

const router = express.Router();
const crypto = require("crypto");
const nodemailer = require('nodemailer');



function sendVerificationEmail(req,res,user){
  let message;
 
                var transporter = nodemailer.createTransport({ service: 'gmail',
                 host: 'smtp.gmail.com',
                 auth: {
                   user: process.env.G_USERNAME,
                   pass:process.env.G_PASSWORD
                 } });
                 //url="http://"+ req.headers.host +"/api/users"+"/confirmation/"+user.email+"/"+user.verificationToken
               
               url="http://localhost:5000"+"/api/users"+"/confirmation/"+user.email+"/"+user.verificationToken
               console.log("sending mail to"+url);
                 var mailOptions = { 
                   from: "umajain1000@gmail.com",
                    to: user.email, 
                    subject: 'Account Verification Token',                
                    text: "Hello " + req.body.name +',\n\n' + 
                    'Please verify your account by clicking the link:\n'+ url +'\n\nThank You!\n' };

                 transporter.sendMail(mailOptions, function (err) {
                     if (err) { 
                      console.log(err); 
                      return res.status(500).send({ msg: err.message }); }
                     else{
                      res.status(200).send('A verification email has been sent to you at ' + user.email + '.');
                     }                     
                     
                 });

}

function randomTokenString() {
return crypto.randomBytes(40).toString('hex');
}
router.get('/confirmation/:email/:token',async(req,res)=>{
  console.log();

  User.findOne({ email: req.params.email }, function (err, user) {
    // not valid user
    if (!user){
        return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
    } 
    // user is already verified
    else if (user.verified){
        return res.status(200).send('User has been already verified. Please Login');
    }
    // verify user
    else{
        // change isVerified to true
        user.verified = true;
        user.save(function (err) {
            // error occur
            if(err){
                return res.status(500).send({msg: err.message});
            }
            // account successfully verified
            else{
              return res.status(200).send("Your Account is Verified,You can now login with your credentials");
            }
        });
    }
});
})

router.get("/resetpassword/:email",(req,res)=>{
  User.findOne({ email: req.params.email },async function (err, account) {
  if(err){
     console.log(error);
     return res.status(500).send({ msg: err.message }); 
  }else{
    if (!account) return   res.status(409).send("No Such User Exists"); ;    
    // create reset token that expires after 24 hours
    account.resetToken = {
        token: randomTokenString(),
        expires: new Date(Date.now() + 24*60*60*1000)
    };
    await account.save();
    // send verification code to email
    var transporter = nodemailer.createTransport({ service: 'gmail',
                 host: 'smtp.gmail.com',
                 auth: {
                   user: 'umajain1000@gmail.com',
                   pass:"_crystal1302_"
                 } });
                
                 var mailOptions = { 
                   from: "umajain1000@gmail.com",
                    to: account.email, 
                    subject: 'Account Verification Token',                
                    html:`<p>Please use the below token to reset your password:</p>
                    <p><code>${account.resetToken.token}</code></p>`}
                    console.log(account.resetToken.token);

                 transporter.sendMail(mailOptions, function (err) {
                     if (err) { 
                      console.log(err); 
                      return res.status(500).send({ msg: err.message }); }
                     else{
                      res.status(200).send('password reset code has been mailed to you at ' + account.email + '.');
                     }                     
                     
                 });
  }

  })

})

router.post('/resetpassword',[
  check('token','Token cant be empty').notEmpty(),
check('password','Password cant be empty').notEmpty()],async (req,res)=>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(401).json({ errors: errors.array() });
  }
  else{
    console.log(req.body.token);

    const account = await User.findOne({ 
      'resetToken.token': req.body.token,
      'resetToken.expires': { $gt: Date.now() }
  });
  
  if (!account)  res.status(401).send({ msg: 'Invalid Token.' })
  else{    
      //encrypt new password
  await bcrypt.hash(req.body.password, 10, async(err, hash) => {
    // update password and remove reset token
    console.log("new password",req.body.password);
account.password = hash;
account.passwordReset =  Date.now();
account.resetToken = undefined;
await account.save();
res.send("Password reset successful ,you can now login with your new password");

 })

  }



 

  }

})

router.post("/createadmin", async (req, res) => {
  try {
    await bcrypt.hash(req.body.password, 10, async(err, hash) => {
      const user = new User({
        name: 'Uma',
        email: 'umajain1000@gmail.com',
        password: hash,
        isAdmin: true
      });
      const newUser = await user.save();
      res.send(newUser);
    });
   } catch (error) {
    res.send({ msg: error.message });
  }
});

//register
router.post('/register',[
    check('email', 'Email length should be 10 to 30 characters').isEmail(),
    check('name', 'Name length should be 10 to 20 characters').isLength({ min: 3 }), 
    check('password','password required').isLength({ min: 6})
] ,async (req, res) => {
  // if errors
  console.log(req.body.email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const user=await User.findOne({ email: req.body.email })
  if (user) {
    //check if user verified or not
    if(user.verified){
      res.status(401).json({errors:"email "+req.body.email+" already verified , Plz login"})
    }   else{
      //verification remaining
      //send mail
      sendVerificationEmail(req,res,user);

        }     
}else{
  
  await bcrypt.hash(req.body.password, 10, async(err, hash) => {
    // Now we can store the password hash in db.    
     const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    verificationToken : randomTokenString()
    });

    const newUser = await user.save();
  if (newUser) {
    //send verification code
    sendVerificationEmail(req,res,newUser);

  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }
  });  
  
}
  
  })
  
  //login
  router.post('/signin', 
  [
    check('email','Email cant be empty').notEmpty(),
check('password','Password cant be empty').notEmpty()
]
  ,async (req, res) => {

    console.log(req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(401).json({ errors: errors.array() });
    }
    const signinUser = await User.findOne({
      email: req.body.email,
    });

    
    if(signinUser){
      if(!signinUser.verified){
        res.status(409).send({ msg: "You Have Registered But Verifcation is Not Yet Done , Check Your Mail " });  
      }else{
        await bcrypt.compare(req.body.password, signinUser.password,async function(err, result) {
          // if res == true, password matched
          // else wrong password  
          if(err){
           console.log(err);
          }   
         if (result) {                        
         console.log(signinUser);
                res.send({
                  _id: signinUser.id,
                  name: signinUser.name,
                  email: signinUser.email,
                  isAdmin: signinUser.isAdmin,
                  token:
                  jwt.sign({
                      _id: signinUser._id,
                      name: signinUser.name,
                      email: signinUser.email,
                      isAdmin: signinUser.isAdmin,
                  
                    },process.env.JWT_SECRET, {
                      expiresIn: '48h'
                    })
                })            
              } else{
                res.status(409).send({ msg: 'Invalid Email or Password.' });
              }
            })

      }
   
  }else {
      res.status(409).send({ msg: "User Doesnt exist" });
    }
  
  })

  router.put('/:id', isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log(req.body.email,req.body.name,req.body.password);
    if (user) {
    User.update(  { _id:userId} ,
       { $set:{name:req.body.name || user.name,email:req.body.email || user.email, password:req.body.password || user.password } 
    },async (err,result)=>{
      if(err){
     console.log(err);
      }else{
        const user = await User.findById(userId).select("-password");
        console.log(user);
      res.send(user);}
    })         
        } else {
          res.status(409).send({ msg: 'User Not Found' });
        }
   
  });

  

module.exports=router;