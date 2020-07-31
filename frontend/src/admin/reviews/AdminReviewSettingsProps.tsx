import Review from '../../classes/Review';

export default interface AdminReviewSettingsProps {
    review: Review | undefined;
    deleteReview: (review: Review) => void;
    setReviewSettings: (review: Review | undefined) => void;
}
