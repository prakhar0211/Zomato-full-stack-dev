require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config"

// microservice routes
import Auth from "./API/Auth"
// Database connection
import ConnectDB from "./database/connection";
import session from "express-session";

const zomato = express();

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(session({ secret: 'cats' }));
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport configuration
googleAuthConfig(passport);

zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "Setup Success" }));

zomato.listen(4000, () =>
    ConnectDB()
        .then(() => console.log("Server is running"))
        .catch((error) => console.log('Error:', error.message))
);