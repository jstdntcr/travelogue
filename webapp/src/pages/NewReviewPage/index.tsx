import { zCreateReviewTrpcInput } from '@travelogue/backend/src/router/createReview/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { trpc } from '../../lib/trpc';

export const NewReviewPage = () => {
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
      await createReview.mutateAsync(values);
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
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}

        <button type="submit">Create Review</button>
      </form>
    </Segment>
  );
};
