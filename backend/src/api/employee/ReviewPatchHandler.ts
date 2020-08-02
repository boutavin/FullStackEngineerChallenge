import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewPatchHandler(req: Request<{ id: 'id', ownerId: 'ownerId', approvers: 'approvers' }>, res: Response) {
    const { id, ownerId, approvers } = req.params;
    if (!id || !ownerId || !approvers) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const review = REVIEWS.find(e => e.id === parseInt(id, 10));
    if (!review) res.send(JSON.stringify({ error: true, msg: 'Review not found' }));
    review?.setOwner(parseInt(ownerId, 10));
    review?.setApprovers(JSON.parse(approvers));
    res.send(JSON.stringify(REVIEWS));
}