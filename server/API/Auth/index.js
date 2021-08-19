// library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

// models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route       /signup
desc        signup with email and password
params      none
Acess       Public
Method      Post
*/
Router.post("/signup", async (req, res) => {
    try {
        await UserModel.findByEmailAndPhone(req.body.credentials);

        // save to DB
        const newUser = await UserModel.create(req.body.credentials)

        // generate JWT auth token
        const token = newUser.generateJwtToken();
        // return
        return res.status(200).json({ token, status: "success" });

    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       /signin
desc        signin with email and password
params      none
Acess       Public
Method      Post
*/
Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        // generate JWT auth token
        const token = user.generateJwtToken();
        // return
        return res.status(200).json({ token, status: "success" });

    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       /google
desc        gogle signin
params      none
Acess       Public
Method      get
*/
Router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ]
}))

/*
Route       /google/callback
desc        gogle signin callback
params      none
Acess       Public
Method      get
*/
Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    return res.json({ token: req.session.passport.user.token })
});

export default Router;