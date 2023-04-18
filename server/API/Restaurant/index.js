import { express } from "express";
import passport from "passport";

// database
import { RestaurantModel } from "../../database/restaurant";

const Router = express.Router();

/*
Route  /
Des     get all rest basedin city
params  none
Access  public
Method  GET
*/
Router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });

        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route  /
Des     get individual rest based on id
params  id
Access  public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if (!restaurant)
            return res.status(404).json({ error: "Restaurant Not Found" });

        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route  /search
Des     get individual rest based on id
params  none
body    searchString
Access  public
Method  GET
*/
Router.get("/search", async (req, res) => {
    try {
        const { searchString } = req.body;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" },
        });

        if (!restaurants)
            return res.status(404).json({ error: `No Restaurant for $(searchString)` });

        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;