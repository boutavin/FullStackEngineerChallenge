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

const Title = styled.h1`
  margin-right: 3rem;
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

  // Force refresh of the settings
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
    // If id is -1 then add new employee otherwise update
    const { data } = (id < 0) ?
      await Api.addEmployee(name) :
      await Api.updateEmployee(id, name);
    if ((data as any).error) return console.log(data);
    setEmployees(data as Employee[]);
    setEmployeeSettings(undefined);
  }

  async function addEmployee() {
    // Provide a temporary new employee to the settings
    setEmployeeSettingsProxy(new Employee(-1, ''));
  }

  function Settings({ employee }: { employee: Employee | undefined }) {
    if (!employee) return null;
    return (
      <Grid item={true} xs={4}>
        <AdminEmployeeSettings
          employee={employeeSettings}
          deleteEmployee={deleteEmployee}
          saveEmployee={saveEmployee}
        />
      </Grid>
    );
  }

  return (
    <div>
      <Grid container={true} spacing={3}>
        <Title>Employees List</Title>

        <Button
          variant="contained"
          color="primary"
          onClick={addEmployee}
          style={{ alignSelf: 'center' }}
        >
          Add employee
        </Button>
      </Grid>

      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4}>
          <form noValidate={true} autoComplete="off">
            <EmployeeList employees={employees} setEmployeeSettingsProxy={setEmployeeSettingsProxy} />
          </form>
        </Grid>
        <Settings employee={employeeSettings} />
      </Grid>
    </div>
  );
}

