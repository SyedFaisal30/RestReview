import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoute from './routes/auth.js';
import './passport.js';
import session from 'express-session';
import { default as userRoute } from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use(
    session({
        secret: "91028asdjsd8oasdas08",
        resave: true,
        saveUninitialized: true,
    })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use("/auth",authRoute);
app.use("/u", userRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});