import Review from '../../classes/Review';

export default interface AdminReviewProps {
    review: Review;
    setReviewSettings: (review: Review | undefined) => void;
}
