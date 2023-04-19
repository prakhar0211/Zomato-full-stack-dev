import { express } from "express";
import passport from "passport";

// database
import { OrderModel } from "../../database/order";

const Router = express.Router();

/*
Route  /
Des     get all orders of user
params  id
Access  public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });

        if (!getOrders) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ orders: getOrders });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route  /new
Des     get all food based on particular rest
params  id
Access  public
Method  POST
*/
Router.get("/new/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const { orderDetails } = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id,
            },
            {
                $push: { orderDetails },
            },
            { new: true }
        );

        return res.json({ order: addNewOrder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;