import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeeDeleteHandler(req: Request<{ id: 'id' }>, res: Response) {
    const { id } = req.params;
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const index = EMPLOYEES.findIndex(e => e.id === employeeId);
    if (index < 0) return res.send(JSON.stringify({ error: true, msg: 'Employee not found' }));
    EMPLOYEES.splice(index, 1);
    res.send(JSON.stringify(EMPLOYEES));
}