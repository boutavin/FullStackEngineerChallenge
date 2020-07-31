import Employee from '../classes/Employee';
import Review from '../classes/Review';

export const EMPLOYEES: Employee[] = [
    new Employee(0, 'Tanjirou'),
    new Employee(1, 'Nezuko'),
    new Employee(2, 'Zenitsu')
];

const r = new Review(5555, EMPLOYEES[1]);
r.setApprovers([EMPLOYEES[0], EMPLOYEES[2]]);


export const REVIEWS: Review[] = [
    r,
    new Review(0, EMPLOYEES[1]),
    new Review(1, EMPLOYEES[2]),
    new Review(2, EMPLOYEES[1]),
    new Review(3, EMPLOYEES[0]),
    new Review(4, EMPLOYEES[0]),
    new Review(5, EMPLOYEES[2])
];