import  express from "express";
import { taskController } from "../controllers/authController";

const router = express.Router()


router.post("/taskRegister", taskController)

export default router; 