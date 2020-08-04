import Employee from '../classes/Employee';
import Review from '../classes/Review';

export const EMPLOYEES: Employee[] = [
    new Employee(0, 'Tanjirou'),
    new Employee(1, 'Nezuko'),
    new Employee(2, 'Zenitsu')
];

const review1 = new Review(0, 1);
review1.setApprovers([0, 2]);
const review2 = new Review(1, 1);
review2.setApprovers([2]);
const review3 = new Review(2, 2);
review3.setApprovers([0, 1]);

export const REVIEWS: Review[] = [
    review1,
    review2,
    review3,
    new Review(3, 1),
    new Review(4, 0)
];