const mongoose =require('mongoose');


const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const Review = mongoose.model('Review', reviewSchema);
module.exports= Review;