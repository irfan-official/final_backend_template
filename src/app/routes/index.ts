import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
// import { WaitingListRoutes } from "../modules/waitingList/waitingList.route"

const router = Router();

router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);
// router.use("/waiting-lists", WaitingListRoutes);





export default router;