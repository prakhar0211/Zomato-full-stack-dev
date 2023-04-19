require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config"

// microservice routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu"
import Image from "./API/Image"
import Order from "./API/orders"
import Reviews from "./API/reviews"
import User from "./API/User"

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

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);

zomato.get("/", (req, res) => res.json({ message: "Setup Success" }));

zomato.listen(4000, () =>
    ConnectDB()
        .then(() => console.log("Server is running"))
        .catch((error) => console.log('Error:', error.message))
);