"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const mongoose_1 = require("mongoose");
const AcademicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true, // include all virtual attributes in response object
    },
});
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', AcademicFacultySchema);