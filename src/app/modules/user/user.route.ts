import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import * as UserController from "./user.controller";
import * as userValidation from "./user.validation";

const router = express.Router();


router.post(
    "/",
    validateRequest(userValidation.createUserValidationSchema),
    UserController.createUser

);

router.patch(
    "/update-profile",
    auth(UserRole.USER, UserRole.ADMIN),
    // validateRequest(userValidation.updateUserValidationSchema),
    UserController.updateUser
);

// FIND USER BY ID (protected)
router.get("/:userId", auth(UserRole.ADMIN), UserController.getUserById);

// DELETE USER BY ID (protected)
router.delete("/:userId", auth(UserRole.ADMIN), UserController.deleteUser);




export const UserRoutes = router;