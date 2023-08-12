import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './students.controller';
import { StudentValidation } from './students.validation';
const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudent);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
