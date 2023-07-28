import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import { AcademicSemesterRoutes } from './app/modules/academicSemister/acdSem.route';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/academic', AcademicSemesterRoutes);

// global error handler
app.use(globalErrorHandlers);

// testing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req, res, next) => {
  throw new Error('Testing Error Logger');
});

export default app;
