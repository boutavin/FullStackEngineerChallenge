import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { EmployeesRoute, EmployeeRoute } from '../routes';
import useEmployees from '../common/useEmployees';
import Employee from '../classes/Employee';

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
`;
function EmployeeList({ employees }: { employees: Employee[] }) {
    const items = employees.map((employee) => {
        const to = EmployeeRoute.reverse({ id: employee.id.toString() }) || EmployeesRoute;
        return (
            <Button
                key={employee.id}
                variant="outlined"
                color="primary"
                component={Link}
                to={to}
            >
                {employee.name}
            </Button>
        );
    });
    return (
        <Ul>
            {items}
        </Ul>
    );
}

export default function EmployeesView() {
    const [employees] = useEmployees();
    return (
        <div>
            <h1>Log as</h1>
            <EmployeeList employees={employees} />
        </div>
    );
}
