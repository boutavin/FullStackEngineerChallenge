import { useState, useEffect } from 'react';
import Api from '../Api';
import Review from '../classes/Review';

export default function useReviews(): [
    Review[],
    React.Dispatch<React.SetStateAction<Review[]>>
] {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await Api.getReviews();
            setReviews(data);
        };
        fetch();
    }, []);

    return [reviews, setReviews];
}