import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';
import Feedback from '../../classes/Feedback';

export default function ReviewFeedbackPostHandler(req: Request<{ id: 'id', approver: 'approver', feedback: 'feedback' }>, res: Response) {
    const { id, approver, feedback } = req.body;
    if (isNaN(id) || isNaN(approver) || isNaN(feedback)) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = REVIEWS.find(e => e.id === id);
    if (!review) return res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    // If approver is not in the approvers list, access is denied
    const isApproverInList = review.approvers.includes(approver);
    if (!isApproverInList) return res.send(JSON.stringify({ error: true, msg: 'Access denied' }));
    // Create feedback
    const feedbackId = parseInt(`${id}${review?.feedbacks.length}`, 10);
    const fb = new Feedback(feedbackId, approver, feedback);
    review?.addFeedback(fb);
    // Remove approver from list
    const index = review.approvers.findIndex(a => a === approver);
    const approvers = [...review.approvers];
    approvers.splice(index, 1);
    review.setApprovers(approvers);
    res.send(JSON.stringify(REVIEWS));
}