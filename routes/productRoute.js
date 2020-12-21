const express =require('express');
const Product =require ('../models/product');
const Review =require ('../models/review');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const  isAuth =require('../middlewares/UserLoggedIn');
const isAdmin =require('../middlewares/IsAdmin');
const data=require("../data");



router.get("/adddata",(req,res)=>{
  console.log("server is ready");
  //add data into products  
 
Product.insertMany(data,(err,res)=>{
   if(err){
  console.log(err);
   }
   else{
     console.log("adding products");
     console.log(res);
   }
})
})

router.get("/:id", (req, res) => {
    Product.findOne({_id:req.params.id}).populate("reviews").exec((err,result)=>{
      if(err)
      res.status(404).send({ msg: "Product Not Found." })
      if (!err) {  
        //console.log(result);
        return   res.send(result);
        }      
       })
    });
  
  
  router.get("/", async (req, res) => {
    console.log(req.query);
    const category = req.query.category ? 
    { category: {
      $regex: req.query.category,
      $options: 'i'
    }} :  {};
    
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};

   console.log(searchKeyword);
  const sortOrder = req.query.sortOrder ? (req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 })
                                         :{ _id: -1 };
    console.log(sortOrder);
    
 // const products = await Product.find({ ...category, ...searchKeyword }).populate("reviews").sort(sortOrder);
  if(req.query.searchKeyword ){
    const products = await Product.find({ $or:[ {name: new RegExp(req.query.searchKeyword,'i')} ,{category: new RegExp(req.query.searchKeyword,'i')},] }).populate("reviews").sort(sortOrder);
    console.log(products);
  res.send(products)
  }else if(req.query.category){
    const products = await Product.find({ $or:[ {name: new RegExp(req.query.category,'i')} ,{category: new RegExp(req.query.category,'i')},] }).populate("reviews").sort(sortOrder);
    console.log(products);
  res.send(products)
  }else{
     
  const products = await Product.find({ ...category, ...searchKeyword }).populate("reviews").sort(sortOrder);
  res.send(products)
  }


  
 
  });

  //add review for product
  router.post('/:id/reviews', [
    check('rating', 'plz give rating').isLength({ min: 1 }), 
    check('comment','comment required').isLength({ min: 1})
],isAuth, async (req, res) => {

  //console.log(req.body.email);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

    const product =  await Product.findById(req.params.id).populate("reviews");
 
    if (product) {
      //craeet new review 
      const review = new Review({
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      });
      
      review.save();

      let sumexiatingrating = product.reviews.reduce((a, c) =>a+parseInt(c.rating) , 0);
   //   console.log("total rating is ",sumexiatingrating);
      sumexiatingrating=sumexiatingrating+parseInt(req.body.rating);
   //   console.log("total final rating is ",sumexiatingrating);
      const size= product.reviews.length+1;
      const rating=sumexiatingrating/size;
      
     // console.log(rating);
         
      Product.updateOne({_id:req.params.id},{$push:{reviews:review},$inc:{numReviews:1},rating:rating  },async (err,result)=>{
         const pro=await Product.findById(req.params.id).populate("reviews");
        res.status(201).send({
         product: pro,
          message: 'Review saved successfully.',
        });

      } );     
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }

  });

  //admin priviledges 
  //update products
  router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  
  });
  //delete product
  router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.send("Error in Deletion.");
    }
  });
  
  //add
  router.post("/", isAuth, isAdmin, async (req, res) => {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  })
  
  

  
module.exports= router;