import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import AdminReviewSettingsProps from './AdminReviewSettingsProps';
import { MenuItem, FormControl, Chip } from '@material-ui/core';
import { FEEDBACK_TEXT } from '../../common/constants';

const Settings = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

export default function AdminReviewSettings({ review, employees, deleteReview, saveReview }: AdminReviewSettingsProps) {
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

    function Feedbacks() {
        if (!feedbacks.length) return null;
        return (
            <div>
                <span>Feedbacks</span>
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
            <FormControl>
                <span>Onwer</span>
                <Select
                    required={true}
                    defaultValue={localOwner}
                    variant="outlined"
                    onChange={handleOwnerChange}
                >
                    {employeeOptions}
                </Select>
            </FormControl>

            <FormControl>
                <span>Approvers</span>
                <Select
                    multiple={true}
                    value={localApprovers}
                    onChange={handleApproversChange}
                    renderValue={RenderApprover}
                >
                    {approverOptions}
                </Select>
            </FormControl>

            <Feedbacks />
            <DeleteButton />
            <Button
                variant="contained"
                color="primary"
                onClick={onSave}
            >
                Save
            </Button>
        </Settings>
    );
}
