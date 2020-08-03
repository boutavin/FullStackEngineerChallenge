import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewFeedbackGetHandler(req: Request<{ id: 'id', approver: 'approver' }>, res: Response) {
    const { id, approver } = req.params;
    const reviewId = parseInt(id, 10);
    const employeeId = parseInt(approver, 10);
    if (isNaN(reviewId) || isNaN(employeeId)) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = REVIEWS.find(e => e.id === reviewId);
    if (!review) return res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    const isApproverInList = review.approvers.includes(employeeId);
    if (!isApproverInList) return res.send(JSON.stringify({ error: true, msg: 'Access denied' }));
    res.send(JSON.stringify(review));
}