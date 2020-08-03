import Review from '../../classes/Review';
import Employee from '../../classes/Employee';

export default interface AdminReviewSettingsProps {
    review: Review;
    employees: Employee[];
    deleteReview: (review: Review) => void;
    saveReview: (id: number, owner: number, approvers: number[]) => void;
}
