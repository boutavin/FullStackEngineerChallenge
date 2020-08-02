import React, { useState } from 'react';
import {
    RouteChildrenProps,
    Redirect
} from 'react-router-dom';
// import styled from 'styled-components';

import { EmployeesRoute, EmployeeRoute } from '../routes';
import { REVIEWS } from '../constants/constants';
import { FormControl, Select, MenuItem, Button } from '@material-ui/core';
import Feedback from '../classes/Feedback';

const feedbackOptions = [
    'Approve',
    'Ápprove with suggestions',
    'Reject'
].map((feedback, id) => <MenuItem value={id} key={id}>{feedback}</MenuItem>);

export default function EmployeeFeedbackView(props: RouteChildrenProps<{ employeeId: string, reviewId: string }>) {
    const [feedbackValue, setFeedbackValue] = useState<number>(-1);

    if (!props || !props.match || !props.match.params) return <Redirect push={true} to={EmployeesRoute} />;
    const { employeeId, reviewId } = props && props.match.params;
    if (!employeeId) return <Redirect push={true} to={EmployeesRoute} />;
    if (!reviewId) return <Redirect push={true} to={EmployeeRoute.reverse({ id: employeeId }) || EmployeesRoute} />;
    const review = REVIEWS.find(r => r.id === parseInt(reviewId, 10));
    if (!review) return <h1>No review found for id: {reviewId}</h1>;
    const approver = review.approvers.find(a => a.id === parseInt(employeeId, 10));
    if (!approver) return <h1>Access denied! Employee #{employeeId} is not an approver of Review #{reviewId}</h1>;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFeedbackValue(parseInt(event.target.value as string, 10));
    };

    const onSave = () => {
        // Create feedback
        const feedback = new Feedback(approver, feedbackValue);
        review.addFeedback(feedback);
        // Remove approver from list
        const index = review.approvers.findIndex(a => a.id === approver.id);
        const approvers = [...review.approvers];
        approvers.splice(index, 1);
        review.setApprovers(approvers);
    };

    return (
        <div>
            <h1>Give feedback for Review #{review.id}</h1>
            <FormControl>
                <span>Feedback</span>
                <Select
                    required={true}
                    variant="outlined"
                    onChange={handleChange}
                >
                    {feedbackOptions}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={onSave}
            >
                Save
            </Button>
        </div>
    );
}
