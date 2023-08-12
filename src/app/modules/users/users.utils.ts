import { IAcademicSemester } from '../academicSemesters/academicSemester.interface';
import { User } from './users.model';

//find last student------------------------
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

//generate student id------------------------
export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

//find last academicFaculty id------------------------
export const findLastAcademicFacultyId = async (): Promise<
  string | undefined
> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

//generate academicFaculty id------------------------
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastAcademicFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};