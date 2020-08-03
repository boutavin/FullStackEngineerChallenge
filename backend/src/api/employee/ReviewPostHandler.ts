import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';
import Review from '../../classes/Review';

export default function ReviewPostHandler(req: Request<{ ownerId: 'ownerId', approvers: 'approvers' }>, res: Response) {
    const { ownerId, approvers } = req.body;
    if (isNaN(ownerId) || !approvers) return res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = new Review(REVIEWS.length, ownerId);
    review.setApprovers(approvers);
    REVIEWS.push(review);
    res.send(JSON.stringify(REVIEWS));
}