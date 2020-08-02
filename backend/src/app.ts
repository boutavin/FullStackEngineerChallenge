import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import EmployeesHandler from './api/employee/EmployeesHandler';
import ReviewsHandler from './api/employee/ReviewsHandler';
import EmployeeGetHandler from './api/employee/EmployeeGetHandler';
import ReviewGetHandler from './api/employee/ReviewGetHandler';
import EmployeeDeleteHandler from './api/employee/EmployeeDeleteHandler';
import ReviewDeleteHandler from './api/employee/ReviewDeleteHandler';
import EmployeePostHandler from './api/employee/EmployeePostHandler';
import ReviewPostHandler from './api/employee/ReviewPostHandler';
import ReviewFeedbackPostHandler from './api/employee/ReviewFeedbackPostHandler';

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('TS App is Running');
});
app.get('/api/employees', EmployeesHandler);
app.get('/api/employee/:id', EmployeeGetHandler);
app.post('/api/employee', EmployeePostHandler);
app.delete('/api/employee/:id', EmployeeDeleteHandler);
app.get('/api/reviews', ReviewsHandler);
app.get('/api/review/:id', ReviewGetHandler);
app.post('/api/review', ReviewPostHandler);
app.delete('/api/review/:id', ReviewDeleteHandler);
app.post('/api/review/feedback', ReviewFeedbackPostHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});