import { Router } from "express";
import * as DashboardController from "./dashboard.controller";
// import auth from "../../middlewares/auth";

const router = Router();

// router.use(auth());

router.get("/", DashboardController.getDashboard);

export default router;