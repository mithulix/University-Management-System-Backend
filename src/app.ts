import cors from 'cors';
import express, { Application } from 'express';
import httpStatus from 'http-status';
import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import routes from './app/routes/routes';
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


export default app;
