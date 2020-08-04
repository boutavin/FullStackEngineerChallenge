import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import EmployeesGetHandler from './api/employee/EmployeesGetHandler';
import EmployeeGetHandler from './api/employee/EmployeeGetHandler';
import EmployeePostHandler from './api/employee/EmployeePostHandler';
import EmployeePatchHandler from './api/employee/EmployeePatchHandler';
import EmployeeDeleteHandler from './api/employee/EmployeeDeleteHandler';
import ReviewsGetHandler from './api/review/ReviewsGetHandler';
import ReviewGetHandler from './api/review/ReviewGetHandler';
import ReviewPostHandler from './api/review/ReviewPostHandler';
import ReviewPatchHandler from './api/review/ReviewPatchHandler';
import ReviewDeleteHandler from './api/review/ReviewDeleteHandler';
import ReviewFeedbackGetHandler from './api/feedback/ReviewFeedbackGetHandler';
import ReviewFeedbackPostHandler from './api/feedback/ReviewFeedbackPostHandler';

// Use dotenv to store environment variables
dotenv.config();

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/employees', EmployeesGetHandler);
app.get('/api/employee/:id', EmployeeGetHandler);
app.get('/api/employee/:id/reviews', ReviewsGetHandler);
app.post('/api/employee', EmployeePostHandler);
app.patch('/api/employee', EmployeePatchHandler);
app.delete('/api/employee/:id', EmployeeDeleteHandler);
app.get('/api/reviews', ReviewsGetHandler);
app.get('/api/review/:id', ReviewGetHandler);
app.post('/api/review', ReviewPostHandler);
app.patch('/api/review', ReviewPatchHandler);
app.delete('/api/review/:id', ReviewDeleteHandler);
app.get('/api/review/:id/feedback/:approver', ReviewFeedbackGetHandler);
app.post('/api/review/feedback', ReviewFeedbackPostHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});