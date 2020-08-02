import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeeDeleteHandler(req: Request<{ id: 'id' }>, res: Response) {
    const { id } = req.params;
    if (!id) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const index = EMPLOYEES.findIndex(e => e.id === parseInt(id, 10));
    if (index < 0) res.send(JSON.stringify({ error: true, msg: 'Employee not found' }));
    EMPLOYEES.splice(index, 1);
    res.send(JSON.stringify(EMPLOYEES));
}