import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';
import Review from '../../../../classes/Review';

export default function ReviewPostHandler(req: Request<{ ownerId: 'ownerId' }>, res: Response) {
    const { ownerId } = req.params;
    if (!ownerId) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = new Review(REVIEWS.length, parseInt(ownerId, 10));
    REVIEWS.push(review);
    res.send(JSON.stringify(REVIEWS));
}