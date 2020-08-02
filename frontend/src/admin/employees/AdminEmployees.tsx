import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Employee from '../../classes/Employee';
import AdminEmployee from './AdminEmployee';
import AdminEmployeeSettings from './AdminEmployeeSettings';
import { EMPLOYEES } from '../../constants/constants';
import { Grid } from '@material-ui/core';

const Ul = styled.ul`
  list-style: none;
`;

// TODO remove
const Debug = styled.pre`
  margin-top: 2rem;
`;

function EmployeeList({ employees, setEmployeeSettingsProxy }: {
  employees: Employee[],
  setEmployeeSettingsProxy: (employee: Employee | undefined) => void
}) {
  const items = employees.map((employee) => (
    <AdminEmployee employee={employee} key={employee.name} setEmployeeSettings={setEmployeeSettingsProxy} />
  ));
  return (
    <Ul>
      {items}
    </Ul>
  );
}

export default function AdminEmployees() {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [employeeSettings, setEmployeeSettings] = useState<Employee>();
  const setEmployeeSettingsProxy = (employee: Employee | undefined) => {
    setEmployeeSettings(undefined);
    setTimeout(() => {
      setEmployeeSettings(employee);
    }, 200);
  };

  function deleteEmployee(employee: Employee): void {
    // TODO
    /*
     const result: Employee[] = await API.deleteEmployee(employee)
    */
    const newValue = employees.filter(e => e.name !== employee.name);
    setEmployees(newValue);
  }

  function addEmployee() {
    const newValue = [...employees, new Employee(employees.length, '')];
    setEmployees(newValue);
  }

  // function saveEmployee(employee: Employee): void {
  //   const newValue = [...employees, new Employee()];
  //   setEmployees(newValue);
  // }

  return (
    <div>
      <h1>Employees List</h1>

      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4}>
          <form noValidate={true} autoComplete="off">
            <EmployeeList employees={employees} setEmployeeSettingsProxy={setEmployeeSettingsProxy} />
          </form>

          <Button
            variant="contained"
            color="primary"
            onClick={addEmployee}
          >
            Add employee
          </Button>
        </Grid>
        <Grid item={true} xs={8}>
          <AdminEmployeeSettings
            employee={employeeSettings}
            deleteEmployee={deleteEmployee}
            setEmployeeSettings={setEmployeeSettings}
          />
        </Grid>
      </Grid>

      <Debug>
        <code>
          {JSON.stringify(employees, null, 4)}
        </code>
      </Debug>
    </div>
  );
}

