import Employee from '../../../classes/Employee';
import Review from '../../../classes/Review';

export const EMPLOYEES: Employee[] = [
    new Employee(0, 'Tanjirou'),
    new Employee(1, 'Nezuko'),
    new Employee(2, 'Zenitsu')
];

const r = new Review(5555, 1);
r.setApprovers([0, 2]);


export const REVIEWS: Review[] = [
    r,
    new Review(0, 1),
    new Review(1, 2),
    new Review(2, 1),
    new Review(3, 0),
    new Review(4, 0),
    new Review(5, 2)
];