import React from 'react';
import styled from 'styled-components';
import { Button, Input, FormControl, Grid } from '@material-ui/core';

import AdminEmployeeSettingsProps from './AdminEmployeeSettingsProps';
import { Reviews } from '../../common/Reviews';

const Settings = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid red;
    border-radius: .5rem;
    border: 2px solid #1976d2;
`;

export default function AdminEmployeeSettings({ employee, deleteEmployee, saveEmployee }: AdminEmployeeSettingsProps) {
    // Use local values to not affect the actual employee object
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
            <FormControl style={{ marginBottom: '1rem' }}>
                <span><strong>Name</strong></span>
                <Input
                    required={true}
                    defaultValue={employee.name}
                    placeholder="Choose a name"
                    onChange={handleChange}
                />
            </FormControl>

            <Reviews employee={employee} />

            <Grid container={true} spacing={3} justify="space-around" style={{ marginTop: '1rem' }}>
                <DeleteButton />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSave}
                >
                    Save
                </Button>
            </Grid>
        </Settings>
    );
}
