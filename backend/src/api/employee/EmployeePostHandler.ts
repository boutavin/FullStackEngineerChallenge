import { Request, Response } from 'express';
import { EMPLOYEES } from '../../constants/constants';
import Employee from '../../classes/Employee';

export default function EmployeePostHandler(req: Request<{ name: 'name' }>, res: Response) {
    const { name } = req.body;
    if (!name) return res.send(JSON.stringify({ error: true, msg: 'Invalid parameter' }));
    const employee = new Employee(EMPLOYEES.length, name);
    EMPLOYEES.push(employee);
    res.send(JSON.stringify(EMPLOYEES));
}