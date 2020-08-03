import React, { useState, useEffect } from 'react';
import {
    RouteChildrenProps,
    Redirect
} from 'react-router-dom';
// import styled from 'styled-components';

import { EmployeesRoute, EmployeeRoute } from '../routes';
import { FormControl, Select, MenuItem, Button } from '@material-ui/core';
import Api, { ErrorResponse } from '../Api';
import Review from '../classes/Review';
import { FEEDBACK_OPTIONS_TEXT } from '../common/constants';

const feedbackOptions = FEEDBACK_OPTIONS_TEXT.map((feedback, id) => <MenuItem value={id} key={id}>{feedback}</MenuItem>);

export default function EmployeeFeedbackView(props: RouteChildrenProps<{ employeeId: string, reviewId: string }>) {
    const [feedbackValue, setFeedbackValue] = useState<number>(-1);
    const [review, setReview] = useState<Review>();
    const hasNoParams = !props || !props.match || !props.match.params;

    const { reviewId, employeeId } = props?.match?.params || { employeeId: '', reviewId: '' };
    useEffect(() => {
        if (hasNoParams) return;
        const fetch = async () => {
            if (!employeeId || !reviewId) return;
            const { data } = await Api.getReviewForFeedback(parseInt(reviewId, 10), parseInt(employeeId, 10));
            if ((data as ErrorResponse).error) return console.log(data);
            setReview(data as Review);
        };
        fetch();
    }, [hasNoParams, employeeId, reviewId]);

    if (hasNoParams) return <Redirect push={true} to={EmployeesRoute} />;
    if (!reviewId) return <Redirect push={true} to={EmployeeRoute.reverse({ id: employeeId }) || EmployeesRoute} />;
    if (!employeeId) return <Redirect push={true} to={EmployeesRoute} />;
    if (!review) return null;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFeedbackValue(parseInt(event.target.value as string, 10));
    };

    const onSave = async () => {
        await Api.addReviewFeedback(parseInt(reviewId, 10), parseInt(employeeId, 10), feedbackValue);
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
