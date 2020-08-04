import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Api from '../Api';
import Review from '../classes/Review';
import Employee from '../classes/Employee';

const Ul = styled.ul`
    margin-block-start: .5rem;
`;

export function Reviews({ employee }: { employee: Employee; }) {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await Api.getEmployeeReviews(employee.id);
            setReviews(data);
        };
        fetch();
    }, [employee.id]);
    if (employee.id < 0) return null;
    return (
        <div>
            <span><strong>Reviews</strong></span>
            <Ul>
                {reviews.map(review => <li key={review.id}>Review #{review.id}</li>)}
            </Ul>
        </div>
    );
}
