import cors from 'cors';
import express, { Application } from 'express';
import httpStatus from 'http-status';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import { generateFacultyId } from './app/modules/users/users.utils';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1/', routes);

// global error handler
app.use(globalErrorHandlers);

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

// testing
const testId=async()=> {
  const testId = await generateFacultyId()
  console.log(testId);
}
testId();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req, res, next) => {
  throw new Error('Testing Error Logger');
});

export default app;
