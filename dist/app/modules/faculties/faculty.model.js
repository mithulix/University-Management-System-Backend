"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const faculty_constant_1 = require("./faculty.constant");
const FacultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: false,
        },
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: faculty_constant_1.gender,
    },
    bloodGroup: {
        type: String,
        enum: faculty_constant_1.bloodGroup,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    profileImage: {
        type: String,
        // required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Faculty = (0, mongoose_1.model)('Faculty', FacultySchema);
