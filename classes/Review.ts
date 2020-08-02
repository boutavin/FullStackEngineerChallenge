import Feedback, { FeedbackJSON } from './Feedback';

export default class Review {
    id: number;
    owner: number;
    approvers: number[] = [];
    feedbacks: FeedbackJSON[] = [];

    constructor(id: number, owner: number) {
        this.id = id;
        this.owner = owner;
    }

    setOwner(owner: number) {
        this.owner = owner;
    }

    setApprovers(approvers: number[]) {
        this.approvers = approvers;
    }

    addFeedback(feedback: Feedback) {
        this.feedbacks = [...this.feedbacks, feedback];
    }

    toJSON() {
        return {
            id: this.id,
            owner: this.owner,
            approvers: this.approvers,
            feedbacks: this.feedbacks
        }
    }

    static fromJSON({ id, owner, approvers, feedbacks }: { id: number, owner: number, approvers: number[], feedbacks: FeedbackJSON[] }) {
        const review = new Review(id, owner);
        review.setApprovers(approvers)
        feedbacks.forEach(f => {
            const { id, approver, option } = f
            const fb = new Feedback(id, approver, option);
            review.addFeedback(fb)
        })
        return review
    }
}
