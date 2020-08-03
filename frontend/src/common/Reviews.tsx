import React, { useState, useEffect } from 'react';

import Api from '../Api';
import Review from '../classes/Review';
import Employee from '../classes/Employee';

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
            <h1>Reviews</h1>
            <ul>
                {reviews.map(review => <li key={review.id}>Review #{review.id}</li>)}
            </ul>
        </div>
    );
}
