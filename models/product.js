const mongoose =require("mongoose");
const Review=require("./review");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number,default:0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews:[{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

module.exports= Product;