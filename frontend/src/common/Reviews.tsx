import React from 'react';

import Employee from '../classes/Employee';
import { REVIEWS } from '../constants/constants';

export function Reviews({ employee }: { employee: Employee; }) {
    const reviews = REVIEWS.filter(review => review.owner.id === employee.id);
    return (
        <div>
            <h1>Reviews</h1>
            <ul>
                {reviews.map(review => <li key={review.id}>Review #{review.id}</li>)}
            </ul>
        </div>
    );
}
