// libraries
import express from "express";
import passport from "passport";

// Database Model
import { FoodModel } from "../../database/allModels"

const Router = express.Router();

/*
Route       /r
desc        get all food based on particular restaurant
params      id
Acess       Public
Method      get
*/
Router.get("/r/:_id", (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route       /c
desc        get all food based on category
params      id
Acess       Public
Method      get
*/
Router.get("/c/:category", (req, res) => {
    try {
        const { category } = req.params;
        const foods = await FoodModel.find({ category: { $regex: category, $options: "i" } });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;