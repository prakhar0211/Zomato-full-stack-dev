// libraries
import express from "express";
import passport from "passport";

// Database Model
import { RestaurantModel } from "../../database/allModels"

const Router = express.Router();

/*
Route       /
desc        get all the restaurant based on city
params      none
Acess       Public
Method      get
*/
Router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });

        return res.json({ restaurants })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       /
desc        get individual restaurant based on id
params      id
Acess       Public
Method      get
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);
        if (!restaurant) return res.status(404).json({ error: "Restaurant not Found" });
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       /search
desc        get restaurant details based on search string
params      none
body        search string
Acess       Public
Method      get
*/
Router.get("/search", async (req, res) => {
    try {
        const { searchString } = req.body;
        const restaurants = await RestaurantModel.find({ name: { $regex: searchString, $options: "i" } })
        if (!restaurant) return res.status(404).json({ error: `Restaurant named ${searchString} not Found` });
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;