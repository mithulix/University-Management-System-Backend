"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const envConfig_1 = __importDefault(require("../../../config/envConfig"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const academicSemester_model_1 = require("../academicSemesters/academicSemester.model");
const faculty_model_1 = require("../faculties/faculty.model");
const students_model_1 = require("../students/students.model");
const users_model_1 = require("./users.model");
const users_utils_1 = require("./users.utils");
// create student service--------------------------------
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    // If password is not given,set default password
    if (!user.password) {
        user.password = envConfig_1.default.default_student_pass;
    }
    // set role
    user.role = 'student';
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester).lean();
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // generate student id
        const id = yield (0, users_utils_1.generateStudentId)(academicSemester);
        // set custom id into both  student & user
        user.id = id;
        student.id = id;
        // Create student using session
        const newStudent = yield students_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        // set student _id (reference) into user.student
        user.student = newStudent[0]._id;
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    //user --> student ---> academicSemester, academicDepartment , academicFaculty
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: [
                { path: 'academicSemester' },
                { path: 'academicDepartment' },
                { path: 'academicFaculty' },
            ],
        });
    }
    return newUserAllData;
});
// create faculty service----------------------------------------
const createFaculty = (faculty, user) => __awaiter(void 0, void 0, void 0, function* () {
    // If password is not given,set default password
    if (!user.password) {
        user.password = envConfig_1.default.default_faculty_pass;
    }
    //set role
    user.role = 'faculty';
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //generate faculty id
        const id = yield (0, users_utils_1.generateFacultyId)();
        //set custom id into both faculty and user
        user.id = id;
        faculty.id = id;
        //create faculty using session
        const newFaculty = yield faculty_model_1.Faculty.create([faculty], { session });
        if (!newFaculty.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        //set faculty to _id (reference) into user.student
        user.faculty = newFaculty[0]._id;
        const newUser = yield users_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        newUserAllData = newUser[0];
        yield sessionStorage.commitTransaction();
        yield sessionStorage.endTransaction();
    }
    catch (error) {
        yield sessionStorage.abortTransaction();
        yield sessionStorage.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield users_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'faculty',
            populate: [
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }
    return newUserAllData;
});
exports.UserService = {
    createStudent,
    createFaculty,
};
