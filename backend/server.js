import express from "express";
import db from "./utils/db.js";
import assetsroutes from "./router/routes.js";
const port = 5000;
const app = express();
app.use(express.json());


app.use('/',assetsroutes)
app.use(assetsroutes)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});