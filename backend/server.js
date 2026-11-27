
import "dotenv/config";

import express from "express";
import db from "./utils/db.js";
import assetsroutes from "./router/routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://192.168.100.53:5173"
  ],
  credentials: true
}));

app.use("/", assetsroutes);

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
