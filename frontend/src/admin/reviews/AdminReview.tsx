import Button from '@material-ui/core/Button';
import React from 'react';
import styled from 'styled-components';
import AdminReviewProps from './AdminReviewProps';

const Li = styled.li`
  margin-bottom: 1rem;
`;

export default function AdminReview({ review, setReviewSettings }: AdminReviewProps) {
    const onClick = () => setReviewSettings(review);
    return (
        <Li>
            <span>Review #{review.id}</span>

            <Button
                variant="contained"
                color="secondary"
                onClick={onClick}
            >
                Configure
            </Button>
        </Li>
    );
}
