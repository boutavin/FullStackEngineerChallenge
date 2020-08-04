import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

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
        // Build employee buttons with proper url
        const to = EmployeeRoute.reverse({ id: employee.id.toString() }) || EmployeesRoute;
        return (
            <Button
                key={employee.id}
                variant="outlined"
                color="primary"
                component={Link}
                to={to}
                style={{ marginBottom: '1rem' }}
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
        <Grid container={true} spacing={3}>
            <Grid item={true} xs={4}>
                <h1>Log as</h1>
                <EmployeeList employees={employees} />
            </Grid>
        </Grid>
    );
}
