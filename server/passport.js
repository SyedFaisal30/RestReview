import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import fs from 'fs';
import path from 'path';
import passport from 'passport';
import Review from './models/review.model.js'; 
import User from "./models/user.model.js"; 
import dotenv from 'dotenv';
import connectDB from './lib/dbConnect.js';

dotenv.config();

const addReviews = async (userId) => {
    const filePath = path.join('./data/review.json');
  
    try {
      // Read the review data from the JSON file
      const data = fs.readFileSync(filePath, 'utf-8');
      const reviews = JSON.parse(data); 
  
      const reviewsWithUserId = reviews.map((review) => ({
        ...review,
        userId,
      }));
      
      connectDB();
      const savedReviews = await Review.insertMany(reviewsWithUserId); 
  
      console.log(`Successfully imported ${savedReviews.length} reviews.`);
      return true;

    } catch (error) {
      console.error('Error importing reviews:', error);
      throw new Error('Failed to import reviews');
    }
  };

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback",
            scope: ["profile","email"],
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                connectDB();
                let user = await User.findOne({
                    $or: [{ googleId: profile.id }, { email: profile.emails[0].value }],
                });

                if (user) {
                    user.name = profile.displayName;
                    user.image = profile.photos ? profile.photos[0].value : user.image;
                    user.googleId = profile.id;
                    await user.save(); 
                } else {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos ? profile.photos[0].value : null,
                        googleId: profile.id,
                    });
                    await user.save(); 

                    await addReviews(user._id);
                }

                return done(null, user); 
            } catch (error) {
                return done(error, null); 
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
  
  passport.deserializeUser((user, done) => {
    done(null, user);
});