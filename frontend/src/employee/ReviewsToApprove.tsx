import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';

import { EmployeeFeedbackRoute, EmployeeRoute, EmployeesRoute } from '../routes';
import useReviews from '../common/useReviews';
import Employee from '../classes/Employee';
import Review from '../classes/Review';

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

function ReviewToApprove({ employee, review }: { employee: Employee, review: Review }) {
    const to = EmployeeFeedbackRoute.reverse({ employeeId: employee.id.toString(), reviewId: review.id.toString() }) ||
        EmployeeRoute.reverse({ id: employee.id }) || EmployeesRoute;
    return (
        <Li>
            <Name>Review #{review.id}</Name>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                to={to}
            >
                Give feedback
            </Button>
        </Li>
    );
}

export function ReviewsToApprove({ employee }: { employee: Employee; }) {
    const [reviews] = useReviews();
    const reviewsToApprove = reviews.filter(review => review.approvers.includes(employee.id));
    const Ul = () => {
        if (!reviewsToApprove.length) return <div><i>None</i></div>;
        return (
            <ul>
                {reviewsToApprove.map(review => <ReviewToApprove key={review.id} employee={employee} review={review} />)}
            </ul>
        );
    };
    return (
        <Grid container={true} spacing={3}>
            <Grid item={true} xs={4}>
                <span><strong>Reviews to approve</strong></span>
                <Ul />
            </Grid>
        </Grid>
    );
}
