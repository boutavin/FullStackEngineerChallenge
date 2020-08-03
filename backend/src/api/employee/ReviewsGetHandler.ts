import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewsGetHandler(req: Request<{ id: 'id' }>, res: Response) {
    const { id } = req.params;
    const employeeId = parseInt(id, 10);
    if (!isNaN(employeeId)) return res.send(JSON.stringify(REVIEWS.filter(review => review.owner === employeeId)));
    res.send(JSON.stringify(REVIEWS));
}