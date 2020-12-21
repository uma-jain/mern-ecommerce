
//wherever you have included development.env file
if(process.env.NODE_ENV !== 'production'){
  require("dotenv").config();
}
const express = require('express')
const connectDB = require('./config/db')
const bodyparser = require('body-parser')
// Config dotev
const cors=require('cors')
const Product=require("./models/product");
const app = express()

const userRoute=require("./routes/userRoutes")
const productRoute=require("./routes/productRoute");
const OrderRoute=require("./routes/orderRoutes")
const UploadRoute=require("./routes/uploadRoute")

// Connect to database
connectDB();
//for client
app.use(cors());

// body parser
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyparser.json())
 
//routes
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/order",OrderRoute);
app.use("/api/uploadimage",UploadRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})

if(process.env.NODE_ENV == 'production'){
	//express will serve up production assets
	//like our main.js file, or main.css file
   app.use(express.static('client/build'));
   	//Express will seerve up index.html file
	//if it doesnt recognize route
   const path=require("path");
   app.get("*",(req,res)=>{
	   res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   })

} 

const PORT = process.env.PORT || 5000;


 app.listen(PORT, () => {
    console.log("Server listening on port 5000");
  });