import { express } from "express";
import passport from "passport";

// database
import { FoodModel } from "../../database/food";

const Router = express.Router();

/*
Route  /r
Des     get all food based on particular rest
params  id
Access  public
Method  GET
*/
Router.get("/r/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route  /r
Des     get all food based on particular category
params  category
Access  public
Method  GET
*/
Router.get("/r/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const foods = await FoodModel.find({ category: { $regex: category, $options: "i" }, });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;