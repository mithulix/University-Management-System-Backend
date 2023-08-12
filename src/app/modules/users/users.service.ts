import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/envConfig';
import ApiError from '../../../errors/ApiErrors';
import { IAcademicSemester } from '../academicSemesters/academicSemester.interface';
import { AcademicSemester } from '../academicSemesters/academicSemester.model';
import { IFaculty } from '../faculties/faculty.interface';
import { Faculty } from '../faculties/faculty.model';
import { IStudent } from '../students/students.interface';
import { Student } from '../students/students.model';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateFacultyId, generateStudentId } from './users.utils';



// create student service--------------------------------
const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean();

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await generateStudentId(academicSemester as IAcademicSemester);
    // set custom id into both  student & user
    user.id = id;
    student.id = id;

    // Create student using session
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student _id (reference) into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student ---> academicSemester, academicDepartment , academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

// create faculty service----------------------------------------
const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  // If password is not given,set default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  //set role
  user.role = 'faculty';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //generate faculty id
    const id = await generateFacultyId();
    //set custom id into both faculty and user
    user.id = id;
    faculty.id = id;
    //create faculty using session
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    //set faculty to _id (reference) into user.student
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    newUserAllData = newUser[0];

    await sessionStorage.commitTransaction();
    await sessionStorage.endTransaction();
  } catch (error) {
    await sessionStorage.abortTransaction();
    await sessionStorage.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
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
};

export const UserService = {
  createStudent,
  createFaculty,
};
