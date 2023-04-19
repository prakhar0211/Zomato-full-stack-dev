import { express } from "express";
import passport from "passport";

// database
import { ReviewModel } from "../../database/reviews";

const Router = express.Router();

/*
Route  /new
Des     add new food/restaurant review/rating
params  none
body    review object
Access  public
Method  POST
*/
Router.post("/new", async (req, res) => {
    try {
        const { reviewData } = req.body;

        await ReviewModel.create(reviewData);

        return res.json({ review: "Successfully created review." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route  /delete
Des     delete new food/restaurant review/rating
params  _id
body    review object
Access  public
Method  delete
*/
Router.delete("/delete/:_id", async (req, res) => {
    try {
        const { _id } = req.params;

        await ReviewModel.findByIdAndDelete(_id);

        return res.json({ review: "Successfully deleted the review." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;