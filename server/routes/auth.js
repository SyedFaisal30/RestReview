import { Router } from 'express';
import passport from 'passport';

const authRoute = Router();

authRoute.get("/login/success", (req, res) =>{
    if(req.user){
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user,
        });
    }else{
        res.status(403).json({
            error: true,
            message: "failed",
        });
    }
});

authRoute.get("/login/failed", (req, res) => {
    res.status(403).json({
        error: true,
        message: "Login failed",
    });
});

authRoute.get("/google", passport.authenticate("google", {scope : ["profile","email"]}));

authRoute.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000",
        failureRedirect: "/login/failed",
    }),
);

authRoute.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        req.session.destroy(() => {
            res.redirect(process.env.CLIENT_URL);
        });
    });
});


export default authRoute;