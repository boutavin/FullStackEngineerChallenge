import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AdminEmployeeSettingsProps from './AdminEmployeeSettingsProps';
import { Reviews } from '../../common/Reviews';

const Settings = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

export default function AdminEmployeeSettings({ employee, deleteEmployee, saveEmployee }: AdminEmployeeSettingsProps) {
    const [localName, setLocalName] = React.useState<string>(employee?.name || '');
    if (!employee) return null;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(event.target.value);
    };
    const onDelete = () => {
        deleteEmployee(employee);
    };
    const onSave = () => {
        saveEmployee(employee.id, localName);
    };

    function DeleteButton() {
        if (employee && employee.id < 0) return null;
        return (
            <Button
                variant="contained"
                color="secondary"
                onClick={onDelete}
            >
                Delete
            </Button>
        );
    }

    return (
        <Settings>
            <Input
                required={true}
                defaultValue={employee.name}
                placeholder="Name"
                onChange={handleChange}
            />

            <Reviews employee={employee} />

            <DeleteButton />
            <Button
                variant="contained"
                color="primary"
                onClick={onSave}
            >
                Save
            </Button>
        </Settings>
    );
}
