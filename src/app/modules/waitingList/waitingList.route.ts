import { Router } from "express";
import * as WaitingListController from "./waitingList.controller";
import * as WaitingListValidation from "./waitingList.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
  validateRequest(WaitingListValidation.createWaitingListZodSchema),
  WaitingListController.createWaitingList,
);

router.get(
  "/",
  validateRequest(WaitingListValidation.getWaitingListZodSchema),
  WaitingListController.getWaitingList,
);

router.patch(
  "/:id",
  validateRequest(WaitingListValidation.updateWaitingListZodSchema),
  WaitingListController.updateWaitingList,
);

router.delete(
  "/:id",
  validateRequest(WaitingListValidation.deleteWaitingListZodSchema),
  WaitingListController.deleteWaitingList,
);

export default router;
