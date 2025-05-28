// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TrpcRouterOutput } from '@travelogue/backend/src/router';
import { zUpdateReviewTrpcInput } from '@travelogue/backend/src/router/updateReview/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { UpdateReviewRouterParams } from '../../lib/routes';
import { getViewReviewRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

const UpdateReviewComponent = ({ review }: { review: NonNullable<TrpcRouterOutput['getReview']['review']> }) => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const navigate = useNavigate();
  const updateReview = trpc.updateReview.useMutation();
  const formik = useFormik({
    initialValues: _.pick(review, ['nick', 'name', 'description', 'text']),
    validate: withZodSchema(zUpdateReviewTrpcInput.omit({ reviewId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await updateReview.mutateAsync({ reviewId: review.id, ...values });
        navigate(getViewReviewRoute({ reviewNick: values.nick }));
      } catch (error: any) {
        setSubmittingError(error.message);
      }
    },
  });

  return (
    <Segment title={`Update Review: ${review.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik}></Input>
          <Input label="Nick" name="nick" formik={formik}></Input>
          <Input label="Description" name="description" formik={formik} maxWidth={500}></Input>
          <Textarea label="Text" name="text" formik={formik}></Textarea>
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update review</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const UpdateReviewPage = () => {
  const { reviewNick } = useParams() as UpdateReviewRouterParams;

  const getReviewResult = trpc.getReview.useQuery({
    reviewNick,
  });

  const getMeResult = trpc.getMe.useQuery();

  if (getReviewResult.isLoading || getReviewResult.isFetching || getMeResult.isLoading || getMeResult.isFetching)
    return <span>Loading...</span>;
  if (getReviewResult.isError) return <span>Error: {getReviewResult.error.message}</span>;
  if (getMeResult.isError) return <span>Error: {getMeResult.error.message}</span>;

  if (!getReviewResult.data?.review) return <span>Idea not found</span>;

  const review = getReviewResult.data.review;
  const me = getMeResult.data?.me;

  if (!me) return <span>You are not logged in</span>;

  if (me.id !== review.authorId) return <span>You can't edit this review</span>;

  return <UpdateReviewComponent review={review} />;
};
