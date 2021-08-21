// libraries
import express from "express";
import passport from "passport";
import AWS from "aws-sdk";
import multer from "multer";

// Database Model
import { ImageModel } from "../../database/allModels"

// utilities
import { s3upload } from "../../Utils/s3";

const Router = express.Router();

// multer config
const storage = multer.memoryStorage();
const upload = multer({ storage })


/*
Route       /
desc        uploads given image to s3 bucket and saves the file link to mongoDB
params      none
Acess       Public
Method      post
*/
Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        // s3 bucket options
        const bucketOptions = {
            Bucket: "zomatofullstack",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.minetype,
            ACL: "public-read", // Access Control List
        };

        const uploadImage = await s3upload(bucketOptions);

        return res.status(200).json({ uploadImage });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
})

export default Router;