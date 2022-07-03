import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import extractRouter from "./routes/extractRouter.js";

dotenv.config();

const app = express();

app.use(json(), cors());
app.use(authRouter);
app.use(extractRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`The server is running in http://localhost:${PORT}`);
});
