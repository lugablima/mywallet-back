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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
