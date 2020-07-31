import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Review from '../../classes/Review';
import { EMPLOYEES, REVIEWS } from '../../constants/constants';
import AdminReview from './AdminReview';
import AdminReviewSettings from './AdminReviewSettings';
import { Grid } from '@material-ui/core';

// TODO remove
const Debug = styled.pre`
  margin-top: 2rem;
`;

export default function AdminReviews() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [reviewSettings, setReviewSettings] = useState<Review>();
  // TODO ugly
  const setReviewSettingsProxy = (review: Review | undefined) => {
    setReviewSettings(undefined);
    setTimeout(() => {
      setReviewSettings(review);
    }, 200);
  };

  function ReviewsItems({ r }: { r: Review[] }) {
    const Ul = styled.ul`
      list-style: none;
    `;
    const lis = r.map((review) => (
      <AdminReview review={review} key={review.id} setReviewSettings={setReviewSettingsProxy} />
    ));

    return (
      <Ul>
        {lis}
      </Ul>
    );
  }

  function deleteReview(review: Review): void {
    // TODO
    /*
     const result: Review[] = await API.deleteReview(review)
    */
    const newValue = reviews.filter(e => e.id !== review.id);
    setReviews(newValue);
  }

  function addReview() {
    const id = reviews.length + 1;
    const employee = EMPLOYEES[Math.floor(Math.random() * EMPLOYEES.length)];
    const newValue = [...reviews, new Review(id, employee)];
    setReviews(newValue);
  }

  // function saveReview(review: Review): void {
  //   const newValue = [...reviews, new Review()];
  //   setReviews(newValue);
  // }

  return (
    <div>
      <h1>Reviews List</h1>

      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4}>
          <form noValidate={true} autoComplete="off">
            <ReviewsItems r={reviews} />
          </form>

          <Button
            variant="contained"
            color="primary"
            onClick={addReview}
          >
            Add review
          </Button>
        </Grid>
        <Grid item={true} xs={8}>
          <AdminReviewSettings
            review={reviewSettings}
            deleteReview={deleteReview}
            setReviewSettings={setReviewSettings}
          />
        </Grid>
      </Grid>

      <Debug>
        <code>
          {JSON.stringify(reviews, null, 4)}
        </code>
      </Debug>
    </div>
  );
}

