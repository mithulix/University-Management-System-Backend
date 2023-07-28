import { model, Schema } from 'mongoose';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './acdSem.constant';
import { AcademicSemesterModel, IAcademicSemester } from './acdSem.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitle },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonth },
    endMonth: { type: String, required: true, enum: academicSemesterMonth },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
