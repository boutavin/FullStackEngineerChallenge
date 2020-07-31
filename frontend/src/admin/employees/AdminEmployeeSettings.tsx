import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AdminEmployeeSettingsProps from './AdminEmployeeSettingsProps';
import Employee from '../../classes/Employee';
import { REVIEWS } from '../../constants/constants';

const Settings = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

function Reviews({ employee }: { employee: Employee }) {
    const reviews = REVIEWS.filter(review => review.owner.id === employee.id);
    return (
        <ul>
            {reviews.map(review => <li key={review.id}>Review #{review.id}</li>)}
        </ul>
    );
}

export default function AdminEmployeeSettings({ employee, deleteEmployee, setEmployeeSettings }: AdminEmployeeSettingsProps) {
    if (!employee) return null;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        employee.setName(event.target.value);
    };
    const onDelete = () => {
        deleteEmployee(employee);
        onSave();
    };
    const onSave = () => setEmployeeSettings(undefined); // TODO don't like that...

    return (
        <Settings>
            <Input
                required={true}
                defaultValue={employee.name}
                onChange={handleChange}
            />

            <Reviews employee={employee} />

            <Button
                variant="contained"
                color="secondary"
                onClick={onDelete}
            >
                Delete
            </Button>
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
