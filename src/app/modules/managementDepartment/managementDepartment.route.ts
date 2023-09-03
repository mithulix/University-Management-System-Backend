import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ENUM_USER_ROLE } from '../../../globalEnums/userEnum';
import auth from '../auth/auth';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.createDepartment,
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  ManagementDepartmentController.getSingleDepartment,
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.updateDepartment,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ManagementDepartmentController.deleteDepartment,
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ),
  ManagementDepartmentController.getAllDepartments,
);

export const ManagementDepartmentRoutes = router;
