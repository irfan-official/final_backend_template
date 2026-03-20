import { Router } from "express";
import * as MailController from "./mail.controller";
// import auth from "../../middlewares/auth";

const router = Router();

// router.use(auth());

router.post("/send", MailController.sendMail);

export default router;