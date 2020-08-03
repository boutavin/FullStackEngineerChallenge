import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AdminReview from './AdminReview';
import AdminReviewSettings from './AdminReviewSettings';
import { Grid } from '@material-ui/core';
import Api from '../../Api';
import useReviews from '../../common/useReviews';
import useEmployees from '../../common/useEmployees';
import Review from '../../classes/Review';

// TODO remove
const Debug = styled.pre`
  margin-top: 2rem;
`;

const Ul = styled.ul`
  list-style: none;
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
    if (!owner) return setReviewSettings(undefined);
    const { data } = (id < 0) ?
      await Api.addReview(owner, approvers) :
      await Api.updateReview(id, owner, approvers);
    if ((data as any).error) return console.log(data);
    setReviews(data as Review[]);
    setReviewSettings(undefined); // TODO don't like that...
  }

  async function addReview() {
    setReviewSettingsProxy(new Review(-1, -1));
  }

  function Settings({ review }: { review: Review | undefined }) {
    if (!review) return null;
    return (
      <Grid item={true} xs={8}>
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
        <Settings review={reviewSettings} />
      </Grid>

      <Debug>
        <code>
          {JSON.stringify(reviews, null, 4)}
        </code>
      </Debug>
    </div>
  );
}

