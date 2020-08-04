import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

import AdminReview from './AdminReview';
import AdminReviewSettings from './AdminReviewSettings';
import Api from '../../Api';
import useReviews from '../../common/useReviews';
import useEmployees from '../../common/useEmployees';
import Review from '../../classes/Review';

const Ul = styled.ul`
  list-style: none;
`;

const Title = styled.h1`
  margin-right: 3rem;
`;

export default function AdminReviews() {
  const [reviews, setReviews] = useReviews();
  const [employees] = useEmployees();
  const [reviewSettings, setReviewSettings] = useState<Review>();

  // Force refresh of the settings
  const setReviewSettingsProxy = (review: Review | undefined) => {
    setReviewSettings(undefined);
    setTimeout(() => {
      setReviewSettings(review);
    }, 200);
  };

  function ReviewsItems({ r }: { r: Review[] }) {
    const lis = r.map((review) => (
      <AdminReview review={review} key={review.id} setReviewSettings={setReviewSettingsProxy} />
    ));

    return (
      <Ul>
        {lis}
      </Ul>
    );
  }

  async function deleteReview(review: Review) {
    const { data } = await Api.deleteReview(review.id);
    if ((data as any).error) return console.log(data);
    setReviews(data as Review[]);
    setReviewSettings(undefined);
  }

  async function saveReview(id: number, owner: number, approvers: number[]) {
    // If id is -1 then add new review otherwise update
    if (!owner) return setReviewSettings(undefined);
    const { data } = (id < 0) ?
      await Api.addReview(owner, approvers) :
      await Api.updateReview(id, owner, approvers);
    if ((data as any).error) return console.log(data);
    setReviews(data as Review[]);
    setReviewSettings(undefined);
  }

  async function addReview() {
    // Provide a temporary new review to the settings
    setReviewSettingsProxy(new Review(-1, -1));
  }

  function Settings({ review }: { review: Review | undefined }) {
    if (!review) return null;
    return (
      <Grid item={true} xs={4}>
        <AdminReviewSettings
          review={review}
          employees={employees}
          deleteReview={deleteReview}
          saveReview={saveReview}
        />
      </Grid>
    );
  }

  return (
    <div>
      <Grid container={true} spacing={3}>
        <Title>Reviews List</Title>

        <Button
          variant="contained"
          color="primary"
          onClick={addReview}
          style={{ alignSelf: 'center' }}
        >
          Add review
        </Button>
      </Grid>

      <Grid container={true} spacing={3}>
        <Grid item={true} xs={4}>
          <form noValidate={true} autoComplete="off">
            <ReviewsItems r={reviews} />
          </form>
        </Grid>
        <Settings review={reviewSettings} />
      </Grid>
    </div>
  );
}

