"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_route_1 = require("../modules/academicDepartments/academicDepartment.route");
const academicFaculty_route_1 = require("../modules/academicFaculties/academicFaculty.route");
const academicSemester_route_1 = require("../modules/academicSemesters/academicSemester.route");
const faculty_router_1 = require("../modules/faculties/faculty.router");
const students_route_1 = require("../modules/students/students.route");
const users_route_1 = require("../modules/users/users.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
    {
        path: '/students',
        route: students_route_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_router_1.FacultyRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_route_1.AcademicDepartmentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
