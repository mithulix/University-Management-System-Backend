import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles
} from './academicSemester.constant';

//create semester zod validation------------------------------
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({ required_error: 'Year is required' }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'EndMonth is required',
    }),
  }),
});

//update semester zod validation-------------------------------
const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }).optional(),
    year: z.string({ required_error: 'Year is required' }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }).optional(),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }).optional(),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'EndMonth is required',
    }).optional(),
  }),
})
.refine(
  (data) => 
    (data.body.title && data.body.code) || 
    (!data.body.title && !data.body.code),
    {
      message:'Either Title or Code must be provided.',
    }
)

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
