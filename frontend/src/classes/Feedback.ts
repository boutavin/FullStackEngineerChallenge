import Employee from './Employee';

export enum FeedBackOption {
    APPROVED = 0,
    APPROVED_WITH_SUGGESTIONS = 1,
    REJECTED = 2,
}

export default class Feedback {
    employee: Employee;
    option: FeedBackOption;

    constructor(employee: Employee, option: FeedBackOption) {
        this.employee = employee;
        this.option = option;
    }
}