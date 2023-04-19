import { express } from "express";
import passport from "passport";

// database
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route  /:_id
Des     get user data
params  id
body    none
Access  public
Method  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);

        return res.json({ user: getUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route  /update
Des     update user id
params  id
body    user data
Access  public
Method  PUT
*/
Router.get("/update/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { userData } = req.body;

        const updateUserData = await UserModel.findByIdAndUpdate(_id, {
            $set: userData,
        }, { new: true }
        );

        return res.json({ user: updateUserData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;
