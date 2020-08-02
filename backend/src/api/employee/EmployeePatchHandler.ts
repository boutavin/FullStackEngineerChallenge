import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeePatchHandler(req: Request<{ id: 'id', name: 'name' }>, res: Response) {
    const { id, name } = req.params;
    if (!id || !name) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const employee = EMPLOYEES.find(e => e.id === parseInt(id, 10));
    if (!employee) res.send(JSON.stringify({ error: true, msg: 'Employee not found' }));
    employee?.setName(name);
    res.send(JSON.stringify(EMPLOYEES));
}