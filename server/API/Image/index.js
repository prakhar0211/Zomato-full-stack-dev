import { express } from "express";
import passport from "passport";
import multer from "multer";

// database
import { ImageModel } from "../../database/image";

// utilities
import { s3Upload } from "../../Utils/s3";

const Router = express.Router();

// multer config    containns image in ram till api is not done uploading
const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
Route  /
Des     uploads image to s3 bucket, and savefile link to mongodb
params  none
Access  public
Method  Post
*/
Router.get("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        // s3 bucket options
        const bucketOptions = {
            Bucket: "",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        };

        const uploadImage = await s3Upload(bucketOptions);
        return res.status(200).json({ uploadImage });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;