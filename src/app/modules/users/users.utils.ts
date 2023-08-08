import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.model';

//find last student------------------------
export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id;
};

//generate student id------------------------
export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;
  return incrementedId;
};

//find last faculty id------------------------
export const findLastFacultyId = async ():Promise<string | undefined>  => {
  const lastFaculty = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id;
};

//generate faculty id------------------------
export const generateFacultyId = async ():Promise<string> => {
  const currentId = (await findLastFacultyId()||(0).toString().padStart(5,"0"));
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
