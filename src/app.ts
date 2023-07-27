import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandlers from './app/modules/user/middlewares/globalErrorHandlers';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//application routes
app.use('/api/v1/user', UserRoutes);
// global error handler
app.use(globalErrorHandlers);

// testing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req, res, next) => {
  throw new Error('Testing Error Logger');
});

export default app;
