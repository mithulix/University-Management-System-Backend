import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginZodSchema));

export const AuthRoutes = router;
