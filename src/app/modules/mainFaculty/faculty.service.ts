import { SortOrder } from "mongoose";
import { IGenericResponse } from "../../../interfaces/common.Interface";
import { IPaginationOptions } from "../../../pagination/pagination.Interface";
import { paginationFields } from "../../../pagination/paginationFields";
import { paginationHelpers } from "../../../pagination/paginationHelper";
import { facultySearchableFields } from "./faculty.constant";
import { IFaculty, IFacultyFilters } from "./faculty.interface";
import { Faculty } from "./faculty.model";

const getAllFaculties = async (
    filters: IFacultyFilters,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IFaculty[]>> => {
    // Extract searchTerm to implement search query
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  
    const andConditions = [];
  
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: facultySearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    };

      // Filters needs $and to fullfil all the conditions
    if(Object.keys(filtersData).length) {
        andConditions.push({
            $and:Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            }))
        });
    };

      // Dynamic  Sort needs  field to  do sorting
    const sortConditions: {[key: string]:SortOrder} = {};
    if(sortBy && sortOrder) {sortConditions[sortBy] =sortOrder};
    const whereConditions = andConditions.length > 0 ? {$and:andConditions} :{};

    const result  = await Faculty.find(whereConditions)
    .populate('academic'
}