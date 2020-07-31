import Button from '@material-ui/core/Button';
import React from 'react';
import styled from 'styled-components';
import AdminEmployeeProps from './AdminEmployeeProps';

const Li = styled.li`
  margin-bottom: 1rem;
`;

export default function AdminEmployee({ employee, setEmployeeSettings }: AdminEmployeeProps) {
    const onClick = () => setEmployeeSettings(employee);
    return (
        <Li>
            <span>{employee.name}</span>

            <Button
                variant="contained"
                color="secondary"
                onClick={onClick}
            >
                Configure
            </Button>
        </Li>
    );
}
