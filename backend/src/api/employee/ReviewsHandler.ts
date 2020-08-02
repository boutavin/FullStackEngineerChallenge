import { Request, Response } from 'express';
import { REVIEWS } from '../../constants/constants';

export default function ReviewsHandler(req: Request, res: Response) {
    res.send(JSON.stringify(REVIEWS));
}