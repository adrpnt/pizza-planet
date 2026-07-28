import cors from "cors";
import express, { type Express } from "express";

import "dotenv/config";

const app: Express = express();
const PORT = process.env.PORT! || 3333;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log("SERVER ONLINE ON PORT: " + PORT));
