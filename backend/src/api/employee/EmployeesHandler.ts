import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeesHandler(req: Request, res: Response) {
    res.send(JSON.stringify(EMPLOYEES));
}