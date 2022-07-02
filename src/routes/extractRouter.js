import { Router } from "express";
import { getExtract, addTransaction } from "../controllers/extractController.js";
import validateTokenUser from "../middlewares/validateTokenUser.js";
import validateTransactionInfos from "../middlewares/validateTransactionInfos.js";

const router = Router();

router.get("/extract", validateTokenUser, getExtract);

router.post("/extract", validateTokenUser, validateTransactionInfos, addTransaction);

export default router;
