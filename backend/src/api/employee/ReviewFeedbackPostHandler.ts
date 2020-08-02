import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';
import Feedback from '../../../../classes/Feedback';

export default function ReviewFeedbackPostHandler(req: Request<{ id: 'id', approver: 'approver', feedback: 'feedback' }>, res: Response) {
    const { id, approver, feedback } = req.params;
    if (!id || !approver || !feedback) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = REVIEWS.find(e => e.id === parseInt(id, 10));
    if (!review) res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    const feedbackId = parseInt(`${id}${review?.feedbacks.length}`, 10);
    const fb = new Feedback(feedbackId, parseInt(approver, 10), parseInt(feedback, 10));
    review?.addFeedback(fb);
    res.send(JSON.stringify(REVIEWS));
}