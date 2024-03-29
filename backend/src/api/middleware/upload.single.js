import multer from "multer";
import path from "path";
import fs from "fs";
import { format } from "date-fns";
import { verifyAccessToken } from "./auth.js";
const __dirname = path.resolve();
//Set to save images to storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { error } = await verifyAccessToken(req);
    if (error) {
      cb(error);
      return;
    }
    const dateTime = `${format(new Date(), `MM-yyyy`)}`;
    const PATH = `${__dirname}/src/publics/uploads/${dateTime}`;
    if (!fs.existsSync(PATH)) {
      fs.mkdirSync(PATH, { recursive: true });
    }
    cb(null, PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
//Create upload function
const uploadSingle = multer({
  storage: storage,
  //Validate file type
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return cb(null, true);
    }
    req.fileValidationError = "Jpeg and png only";
    cb(null, false, new Error("Jpeg and png only"));
  },
}).array("image", 1);
export default uploadSingle;
