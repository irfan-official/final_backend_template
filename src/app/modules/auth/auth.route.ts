
import express from 'express'
import * as AuthController from './auth.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post("/login", AuthController.login)
router.post("/logout", auth(), AuthController.logout)
router.post("/forgot-password", auth(), AuthController.forgotPassword);
router.get("/reset-password/:token", AuthController.checkResetPasswordToken); // frontnd hit it for checking the token is valod or not
router.post("/reset-password/:token", AuthController.resetPassword);


export default router;