import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import AdminEmployeeProps from './AdminEmployeeProps';

const Li = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    border-bottom: 1px solid #818479;
    padding-bottom: .2rem;
`;

const Name = styled.span`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export default function AdminEmployee({ employee, setEmployeeSettings }: AdminEmployeeProps) {
    const onClick = () => setEmployeeSettings(employee);
    return (
        <Li>
            <Name>{employee.name}</Name>

            <Button
                variant="contained"
                onClick={onClick}
            >
                Configure
            </Button>
        </Li>
    );
}
