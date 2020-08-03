import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewPatchHandler(req: Request<{ id: 'id', ownerId: 'ownerId', approvers: 'approvers' }>, res: Response) {
    const { id, ownerId, approvers } = req.body;
    if (isNaN(id) || isNaN(ownerId) || !approvers) return res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = REVIEWS.find(e => e.id === id);
    if (!review) return res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    review?.setOwner(ownerId);
    review?.setApprovers(approvers);
    res.send(JSON.stringify(REVIEWS));
}