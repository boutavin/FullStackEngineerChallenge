import Route from 'route-parser';

export const AdminRoute = '/admin';
export const AdminEmployeesRoute = '/admin/employees';
export const AdminReviewsRoute = '/admin/reviews';
export const EmployeesRoute = '/employees';
export const EmployeeRoutePath = '/employee/:id';
export const EmployeeRoute = new Route(EmployeeRoutePath);
export const EmployeeFeedbackRoutePath = '/employee/:employeeId/feedback/:reviewId';
export const EmployeeFeedbackRoute = new Route(EmployeeFeedbackRoutePath);