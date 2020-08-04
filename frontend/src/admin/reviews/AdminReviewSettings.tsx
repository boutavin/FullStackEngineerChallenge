import React from 'react';
import styled from 'styled-components';
import { Button, MenuItem, FormControl, Chip, Grid, Select } from '@material-ui/core';

import AdminReviewSettingsProps from './AdminReviewSettingsProps';
import { FEEDBACK_TEXT } from '../../common/constants';
import { FeedbackJSON } from '../../classes/Feedback';
import Employee from '../../classes/Employee';

const Settings = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid red;
    border-radius: .5rem;
    border: 2px solid #1976d2;
`;

function Feedbacks({ feedbacks, employees }: { feedbacks: FeedbackJSON[], employees: Employee[] }) {
    if (!feedbacks.length) return null;
    return (
        <div>
            <span><strong>Feedbacks</strong></span>
            <ul>
                {feedbacks.map(feedback => {
                    const approver = employees.find(e => e.id === feedback.approver);
                    return (
                        <li key={feedback.id}>{approver?.name} {FEEDBACK_TEXT[feedback.option]}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function AdminReviewSettings({ review, employees, deleteReview, saveReview }: AdminReviewSettingsProps) {
    // Use local values to not affect the actual review object
    const [localOwner, setLocalOwner] = React.useState<number>(review.owner);
    const [localApprovers, setLocalApprovers] = React.useState<number[]>(review.approvers || []);
    const { feedbacks } = review;

    const handleOwnerChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        setLocalOwner(event.target.value as number);
    };
    const handleApproversChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const approvers = event.target.value as number[];
        setLocalApprovers(approvers);
    };
    const onDelete = () => {
        deleteReview(review);
    };
    const onSave = async () => {
        saveReview(review.id, localOwner, localApprovers);
    };

    const employeeOptions = employees.map(employee => <MenuItem value={employee.id} key={employee.id}>{employee.name}</MenuItem>);
    // Filters the employees to exclude the owner of the review and the ones who already submitted a feedback.
    // Could be done on the server side instead.
    const approverOptions = employees
        .filter(e => e.id !== localOwner && !feedbacks.find(f => f.approver === e.id))
        .map(employee => <MenuItem value={employee.id} key={employee.id}>{employee.name}</MenuItem>);
    const RenderApprover = (selected: unknown) => {
        const approvers = (selected as number[]).map(se => employees.find(e => e.id === se));
        return (
            <div>
                {approvers.map((value) => (
                    <Chip key={value?.id} label={value?.name} />
                ))}
            </div>
        );
    };

    function DeleteButton() {
        if (review.id < 0) return null;
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
                <span><strong>Onwer</strong></span>
                <Select
                    required={true}
                    defaultValue={localOwner}
                    variant="outlined"
                    onChange={handleOwnerChange}
                >
                    {employeeOptions}
                </Select>
            </FormControl>

            <FormControl style={{ marginBottom: '1rem' }}>
                <span><strong>Approvers</strong></span>
                <Select
                    multiple={true}
                    value={localApprovers}
                    onChange={handleApproversChange}
                    renderValue={RenderApprover}
                >
                    {approverOptions}
                </Select>
            </FormControl>

            <Feedbacks feedbacks={feedbacks} employees={employees} />

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
