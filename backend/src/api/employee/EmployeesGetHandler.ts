import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeesGetHandler(req: Request, res: Response) {
    res.send(JSON.stringify(EMPLOYEES));
}