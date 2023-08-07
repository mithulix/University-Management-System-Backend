import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../pagination/paginationFields";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyService } from "./academicFaculty.service";


//create faculty controller------------------------
const createFaculty = catchAsync(async(req:Request, res:Response)=>{
    const {...academicFacultyData}= req.body;
    const result = await AcademicFacultyService.createFaculty(
        academicFacultyData
    );
    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
      });
});

//get all faculty controller------------------------
const getAllFaculties = catchAsync(async(req:Request, res:Response)=> {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicFacultyService.getAllFaculties(filters, paginationOptions);

    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties retrieved successfully',
        meta: result.meta,
        data: result.data,
      });
});

//get single faculty controller------------------------
const getSingleFaculty = catchAsync(async(req:Request, res:Response)=> {
    const {id} = req.params;
    const result = await AcademicFacultyService.getSingleFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty fetched successfully',
        data: result,
      });
});


//update faculty controller------------------------
const updateFaculty = catchAsync(async(req:Request, res:Response)=> {
    const {id} = req.params;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result,
      });
});


//delete faculty controller------------------------
const deleteFaculty = catchAsync(async(req:Request, res:Response)=> {
    const {id} = req.params;
    const result = await AcademicFacultyService.deleteFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty deleted successfully',
        data: result,
      });
});

export const AcademicFacultyController = {
    createFaculty,
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
  };

