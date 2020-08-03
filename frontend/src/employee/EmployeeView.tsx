import React, { useState, useEffect } from 'react';
import {
    RouteChildrenProps,
    Redirect
} from 'react-router-dom';
// import styled from 'styled-components';

import { EmployeesRoute } from '../routes';
import { Reviews } from '../common/Reviews';
import { ReviewsToApprove } from './ReviewsToApprove';
import Api, { ErrorResponse } from '../Api';
import Employee from '../classes/Employee';

export default function EmployeeView(props: RouteChildrenProps<{ id: string }>) {
    const [employee, setEmployee] = useState<Employee>();
    const [loading, setLoading] = useState(false);
    const hasNoParams = !props || !props.match || !props.match.params;
    const id = props?.match?.params.id || '';
    useEffect(() => {
        if (hasNoParams) return;
        const fetch = async () => {
            const { data } = await Api.getEmployee(parseInt(id, 10));
            if ((data as ErrorResponse).error) return console.log(data);
            setEmployee(data as Employee);
            setLoading(false);
        };
        setLoading(true);
        fetch();
    }, [hasNoParams, id]);
    if (loading) return null;
    if (hasNoParams) return <Redirect push={true} to={EmployeesRoute} />;
    if (!employee) return <h1>No employee found for id: {id}</h1>;
    return (
        <div>
            <h1>You are logged as {employee.name}</h1>
            <Reviews employee={employee} />
            <ReviewsToApprove employee={employee} />
        </div>
    );
}
