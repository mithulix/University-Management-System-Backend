import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartments/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculties/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemesters/academicSemester.route';
import { FacultyRoutes } from '../modules/faculties/faculty.router';
import { StudentRoutes } from '../modules/students/students.route';
import { UserRoutes } from '../modules/users/users.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
