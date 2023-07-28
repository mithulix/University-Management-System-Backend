import { IAcademicSemester } from './acdSem.interface';
import { AcademicSemester } from './acdSem.model';

export const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = { createSemester };
