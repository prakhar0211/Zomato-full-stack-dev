import { express } from "express";
import passport from "passport";

// database
import { FoodModel } from "../../database/food";

const Router = express.Router();

/*
Route  /
Des     get all rest basedin city
params  none
Access  public
Method  GET
*/