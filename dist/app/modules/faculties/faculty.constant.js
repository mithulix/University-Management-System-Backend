"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultySearchableFields = exports.facultyFilterableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.facultyFilterableFields = [
    'searchTerm',
    'id',
    'gender',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
    'academicFaculty',
    'academicDepartment',
    'designation',
];
exports.facultySearchableFields = [
    'email',
    'contactNo',
    'bloodGroup',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
