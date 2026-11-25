import express from 'express'
import { createAsset,updateAsset,deleteAsset,getAllAssets,searchAsset,getSingleAsset } from '../controller/Assets.js'
import upload from "../middleware/uploadimage.js";

const routes = express.Router()

routes.route("/api/add").post(upload.single("photograph"), createAsset);
routes.route("/api/edit/:id").patch(upload.single("photograph"), updateAsset);
routes.route('/api/delete/:id').delete(deleteAsset)

routes.get("/api/assets", getAllAssets);
routes.get("/api/assets/:asset_id", getSingleAsset);
routes.get("/api/search", searchAsset)



export default routes;