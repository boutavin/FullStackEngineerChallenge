import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';

export default function EmployeeGetHandler(req: Request<{ id: 'id' }>, res: Response) {
    const { id } = req.params;
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId)) res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const employee = EMPLOYEES.find(e => e.id === employeeId);
    if (!employee) return res.send(JSON.stringify({ error: true, msg: 'Employee not found' }));
    res.send(JSON.stringify(employee?.toJSON()));
}