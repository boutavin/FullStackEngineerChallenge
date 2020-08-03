export enum FeedBackOption {
    APPROVED = 0,
    APPROVED_WITH_SUGGESTIONS = 1,
    REJECTED = 2,
}

export interface FeedbackJSON {
    id: number,
    approver: number,
    option: number
}

export default class Feedback {
    id: number;
    approver: number;
    option: FeedBackOption;

    constructor(id: number, approver: number, option: FeedBackOption) {
        this.id = id;
        this.approver = approver;
        this.option = option;
    }

    toJSON(): FeedbackJSON {
        return {
            id: this.id,
            approver: this.approver,
            option: this.option
        }
    }

    static fromJSON({ id, approver, option }: { id: number, approver: number, option: number }) {
        return new Feedback(id, approver, option);
    }
}