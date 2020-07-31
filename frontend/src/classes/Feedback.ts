import Employee from './Employee';

export enum FeedBackOption {
    APPROVED = 'Approved',
    APPROVED_WITH_SUGGESTIONS = 'Approved with suggestions',
    REJECTED = 'Rejected',
}

export default class Feedback {
    employee: Employee;
    option: FeedBackOption;

    constructor(employee: Employee, option: FeedBackOption) {
        this.employee = employee;
        this.option = option;
    }
}