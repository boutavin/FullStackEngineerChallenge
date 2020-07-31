import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import AdminReviewSettingsProps from './AdminReviewSettingsProps';
import { EMPLOYEES } from '../../constants/constants';
import { MenuItem, FormControl, Chip } from '@material-ui/core';
import Employee from '../../classes/Employee';

const Settings = styled.div`
  margin: 1rem;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

export default function AdminReviewSettings({ review, deleteReview, setReviewSettings }: AdminReviewSettingsProps) {
    const [approvers, setApprovers] = React.useState<Employee[]>([]);
    useEffect(() => {
        if (!review) return;
        setApprovers(review.approvers);
    }, [review]);
    if (!review) return null;

    const handleOwnerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const owner = EMPLOYEES.find(e => e.id === event.target.value);
        if (!owner) return;
        review.setOwner(owner);
    };
    const handleApproversChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const [approver] = event.target.value as [Employee, number];
        setApprovers([approver]);
        review.setApprovers([approver]);
    };
    const onDelete = () => {
        deleteReview(review);
        onSave();
    };
    const onSave = () => setReviewSettings(undefined); // TODO don't like that...

    const employeeOptions = EMPLOYEES.map(employee => <MenuItem value={employee.id} key={employee.id}>{employee.name}</MenuItem>);
    const approverOptions = EMPLOYEES
        .filter(e => e.id !== review.owner.id)
        .map(employee => <MenuItem value={employee.id} key={employee.id}>{employee.name}</MenuItem>);
    const RenderApprover = (selected: unknown) => (
        <div>
            {(selected as Employee[]).map((value) => (
                <Chip key={value.id} label={value.name} />
            ))}
        </div>
    );

    return (
        <Settings>
            <FormControl>
                <span>Approvers</span>
                <Select
                    required={true}
                    defaultValue={review.owner.id}
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
                    value={approvers}
                    onChange={handleApproversChange}
                    renderValue={RenderApprover}
                >
                    {approverOptions}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="secondary"
                onClick={onDelete}
            >
                Delete
            </Button>
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
