import Employee from './Employee';
import Feedback from './Feedback';

export default class Review {
    id: number;
    owner: Employee;
    approvers: Employee[] = [];
    feedbacks: Feedback[] = [];

    constructor(id: number, owner: Employee) {
        this.id = id;
        this.owner = owner;
    }

    setOwner(owner: Employee) {
        this.owner = owner;
    }

    setApprovers(approvers: Employee[]) {
        this.approvers = approvers;
    }

    addFeedback(feedback: Feedback) {
        this.feedbacks = [...this.feedbacks, feedback];
    }
}
