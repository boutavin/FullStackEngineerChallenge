import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewGetHandler(req: Request<{ id: 'id' }>, res: Response) {
    const { id } = req.params;
    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) return res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = REVIEWS.find(r => r.id === reviewId);
    if (!review) return res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    res.send(JSON.stringify(review?.toJSON()));
}