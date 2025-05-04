import { zCreateReviewTrpcInput } from '@travelogue/backend/src/router/createReview/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

export const NewReviewPage = () => {
  const [successMessageVisible, setSuccessMessageVisibe] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const createReview = trpc.createReview.useMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateReviewTrpcInput),
    onSubmit: async (values) => {
      try {
        await createReview.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisibe(true);
        setTimeout(() => {
          setSuccessMessageVisibe(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });

  return (
    <Segment title="New Review">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} maxWidth={500} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}
        {successMessageVisible && <Alert color="green">Review created successfully</Alert>}

        <Button loading={formik.isSubmitting}>Create review</Button>
      </form>
    </Segment>
  );
};
