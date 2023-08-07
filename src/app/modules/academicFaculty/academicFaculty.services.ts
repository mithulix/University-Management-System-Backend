import { IGenericResponse } from "../../../interfaces/common.Interface";
import { IAcademicFaculty, IAcademicFacultyFilters } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


// create faculty---------------------
const createFaculty = async(
    payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.create(payload);
    return result;
};

//get All faculty-------------------
const getAllFaculties = async (
    filters: IAcademicFacultyFilters, 
    paginationOptions: IPaginationOptions
):Promise<IGenericResponse><IAcademicFaculty[]>> => {
    try{
}