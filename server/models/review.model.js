import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true,
  },
  authorProfileImage: {
    type: String,
    required: false, 
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true, 
  },
  reply: {
    type: String, 
    required: false,
  }, 
  userId : {
    type: String,
    required: true
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
