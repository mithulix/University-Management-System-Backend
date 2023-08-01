import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { IGenericResponse } from '../../../interfaces/common.Interface';
import { IPaginationOption } from '../../../interfaces/pagination.Interface';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { academicSemesterTitleCodeMapper } from './acdSem.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './acdSem.interface';
import { AcademicSemester } from './acdSem.model';

//create semester
export const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

//getAllSemester with pagination
const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const academicSemesterSearchableFields = ['title', 'code', 'year'];
  const { searchTerm } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $option: 'i',
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();
  return { meta: { page, limit, total }, data: result };
};

export const AcademicSemesterService = { createSemester, getAllSemesters };
