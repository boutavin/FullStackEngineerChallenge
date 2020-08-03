import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { EmployeeFeedbackRoute, EmployeeRoute, EmployeesRoute } from '../routes';
import useReviews from '../common/useReviews';
import Employee from '../classes/Employee';
import Review from '../classes/Review';


const Li = styled.li`
  margin-bottom: 1rem;
`;

export default function ReviewToApprove({ employee, review }: { employee: Employee, review: Review }) {
    const to = EmployeeFeedbackRoute.reverse({ employeeId: employee.id.toString(), reviewId: review.id.toString() }) ||
        EmployeeRoute.reverse({ id: employee.id }) || EmployeesRoute;
    return (
        <Li>
            <span>Review #{review.id}</span>

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
    return (
        <div>
            <h1>Reviews to approve</h1>
            <ul>
                {reviewsToApprove.map(review => <ReviewToApprove key={review.id} employee={employee} review={review} />)}
            </ul>
        </div>
    );
}
