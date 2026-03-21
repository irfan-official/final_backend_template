import { Router } from "express";
import * as ServeFileController from "./serveFile.controller";
// import auth from "../../middlewares/auth";

const router = Router();

// router.use(auth());

router.get("/company-logo", ServeFileController.getCompanyLogo);

export default router;