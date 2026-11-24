import express from 'express'
import { createAsset } from '../controller/Assets.js'
import upload from "../middleware/uploadimage.js";

const routes = express.Router()

routes.route("/api/add").post(upload.single("photograph"), createAsset);



export default routes;