import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../pagination/paginationFields';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyService } from './faculty.service';

//----get single faculty --------------------------------
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Single Faculty fetched successfully !',
    data: result,
  });
});

//----get all faculties --------------------------------
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions,
  );

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

//----update a faculty --------------------------------
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyService.updateFaculty(id, updatedData);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

//----update a faculty --------------------------------
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const FacultyController = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
