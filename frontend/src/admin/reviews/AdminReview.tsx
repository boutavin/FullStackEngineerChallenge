import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import AdminReviewProps from './AdminReviewProps';

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

export default function AdminReview({ review, setReviewSettings }: AdminReviewProps) {
    const onClick = () => setReviewSettings(review);
    return (
        <Li>
            <Name>Review #{review.id}</Name>

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
