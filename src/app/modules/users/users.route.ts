import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';
import { UserController } from './users.controller';
import { ENUM_USER_ROLE } from '../../../globalEnums/userEnum';
import auth from '../auth/auth';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin,
);
export const UserRoutes = router;
