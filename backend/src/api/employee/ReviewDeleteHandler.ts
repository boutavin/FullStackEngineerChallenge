import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewDeleteHandler(req: Request<{ id: 'id' }>, res: Response) {
    const { id } = req.params;
    const reviewId = parseInt(id, 10);
    if (isNaN(reviewId)) return res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const index = REVIEWS.findIndex(r => r.id === reviewId);
    if (index < 0) res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    REVIEWS.splice(index, 1);
    res.send(JSON.stringify(REVIEWS));
}