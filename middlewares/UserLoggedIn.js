const jwt=require("jsonwebtoken");

module.exports=function(req,res,next){
 const token=req.header('x-auth-token');
 //check if not token
 console.log('token from is loggged in ',token);
 if(!token){
     return res.status(401).json({'msg':'No token,authorization denied'})
 }    
 //verify token 
 try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET)
     req.user=decoded;
     next();
      
 }catch(err){
     console.log(err)
     res.status(401).json({msg:'Token is not valid'})
 }
 

}