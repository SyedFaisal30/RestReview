import { Router } from "express";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import connectDB from "../lib/dbConnect.js";

const userRoute = Router();

userRoute.post("/get-reviews", async (req, res) => {
  const data = req.body;
  const googleId = data.googleId;
  if (!googleId) {
    return res.status(400).json({ message: "userId is required" });
  }
  
  try {
      connectDB();
      const user = await User.findOne({ googleId });
      const userId = user._id;
        const reviews = await Review.find({ userId });

        if (reviews.length === 0) {
            return res
                .status(404)
                .json({ message: "No reviews found for this user" });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
});

userRoute.post("/update-reply", async (req, res) => {
    const { reviewId, reply } = req.body;

    console.log(`reviewId: ${reviewId}, reply: ${reply}`);
    
    if (!reviewId) {
        return res
        .status(400)
        .json({ message: "reply and reviewId are required" });
    }
    
    try {
        connectDB();
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $set: { reply } },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(updatedReview); // Return the updated review
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating reply" });
    }
});

export default userRoute;
