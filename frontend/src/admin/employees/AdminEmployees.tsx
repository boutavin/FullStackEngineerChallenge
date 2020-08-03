import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

import AdminEmployee from './AdminEmployee';
import AdminEmployeeSettings from './AdminEmployeeSettings';
import Api from '../../Api';
import useEmployees from '../../common/useEmployees';
import Employee from '../../classes/Employee';

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
  const [employees, setEmployees] = useEmployees();
  const [employeeSettings, setEmployeeSettings] = useState<Employee>();

  const setEmployeeSettingsProxy = (employee: Employee | undefined) => {
    setEmployeeSettings(undefined);
    setTimeout(() => {
      setEmployeeSettings(employee);
    }, 200);
  };

  async function deleteEmployee(employee: Employee) {
    const { data } = await Api.deleteEmployee(employee.id);
    if ((data as any).error) return console.log(data);
    setEmployees(data as Employee[]);
    setEmployeeSettings(undefined);
  }

  async function saveEmployee(id: number, name: string) {
    const { data } = (id < 0) ?
      await Api.addEmployee(name) :
      await Api.updateEmployee(id, name);
    if ((data as any).error) return console.log(data);
    setEmployees(data as Employee[]);
    setEmployeeSettings(undefined); // TODO don't like that...
  }

  async function addEmployee() {
    setEmployeeSettingsProxy(new Employee(-1, ''));
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
            saveEmployee={saveEmployee}
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

