import React from 'react';
import {
    RouteChildrenProps,
    Redirect
} from 'react-router-dom';
// import styled from 'styled-components';

import { EmployeesRoute } from '../routes';
import { Reviews } from '../common/Reviews';
import { EMPLOYEES } from '../constants/constants';
import { ReviewsToApprove } from './ReviewsToApprove';

export default function EmployeeView(props: RouteChildrenProps<{ id: string }>) {
    if (!props || !props.match || !props.match.params) return <Redirect push={true} to={EmployeesRoute} />;
    const { id } = props && props.match.params;
    const employee = EMPLOYEES.find(e => e.id === parseInt(id, 10));
    if (!employee) return <h1>No employee found for id: {id}</h1>;
    return (
        <div>
            <h1>You are logged as {employee.name}</h1>
            <Reviews employee={employee} />
            <ReviewsToApprove employee={employee} />
        </div>
    );
}
