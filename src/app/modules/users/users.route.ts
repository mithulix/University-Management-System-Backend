import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './users.controller';
import { UserValidation } from './users.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyController.createFacultyZodSchema),
  FacultyController.createFaculty)
);

export const UserRoutes = router;