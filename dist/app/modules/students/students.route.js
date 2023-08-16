"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const students_controller_1 = require("./students.controller");
const students_validation_1 = require("./students.validation");
const router = express_1.default.Router();
router.get('/:id', students_controller_1.StudentController.getSingleStudent);
router.get('/', students_controller_1.StudentController.getAllStudent);
router.delete('/:id', students_controller_1.StudentController.deleteStudent);
router.patch('/:id', (0, validateRequest_1.default)(students_validation_1.StudentValidation.updateStudentZodSchema), students_controller_1.StudentController.updateStudent);
exports.StudentRoutes = router;
