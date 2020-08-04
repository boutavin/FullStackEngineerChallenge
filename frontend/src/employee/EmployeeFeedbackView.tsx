import React, { useState, useEffect } from 'react';
import {
    RouteChildrenProps,
    Redirect
} from 'react-router-dom';
import { FormControl, Select, MenuItem, Button, Grid, InputLabel, makeStyles, createStyles } from '@material-ui/core';

import { EmployeesRoute, EmployeeRoute } from '../routes';
import Api, { ErrorResponse } from '../Api';
import Review from '../classes/Review';
import { FEEDBACK_OPTIONS_TEXT } from '../common/constants';

const useStyles = makeStyles(() =>
    createStyles({
        formControl: {
            minWidth: 120,
        },
    }),
);

// Build feedback options
const feedbackOptions = FEEDBACK_OPTIONS_TEXT.map((feedback, id) => <MenuItem value={id} key={id}>{feedback}</MenuItem>);

export default function EmployeeFeedbackView(props: RouteChildrenProps<{ employeeId: string, reviewId: string }>) {
    const classes = useStyles();
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
        // Go back to the employee view (Ugly... Should find a better way through the router api)
        window.location.href = `http://localhost:3000/employee/${employeeId}`;
    };

    return (
        <div>
            <h1>Give feedback for Review #{review.id}</h1>
            <Grid container={true} spacing={3} alignItems="center" justify="space-around" xs={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="feedback-label">Feedback</InputLabel>
                    <Select
                        required={true}
                        labelId="feedback-label"
                        label="Feedback"
                        placeholder="Please give your feedback..."
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
            </Grid>
        </div>
    );
}
