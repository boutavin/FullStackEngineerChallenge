import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeePatchHandler(req: Request<{ id: 'id', name: 'name' }>, res: Response) {
    const { id, name } = req.body;
    if (isNaN(id) || !name) return res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const employee = EMPLOYEES.find(e => e.id === id);
    if (!employee) return res.send(JSON.stringify({ error: true, msg: 'Employee not found' }));
    employee?.setName(name);
    res.send(JSON.stringify(EMPLOYEES));
}