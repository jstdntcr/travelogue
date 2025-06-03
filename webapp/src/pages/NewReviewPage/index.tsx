import { zCreateReviewTrpcInput } from '@travelogue/backend/src/router/createReview/input';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { useMe } from '../../lib/ctx';
import { useForm } from '../../lib/form';
import { trpc } from '../../lib/trpc';

export const NewReviewPage = () => {
  const me = useMe();
  const createReview = trpc.createReview.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateReviewTrpcInput,
    onSubmit: async (values) => {
      await createReview.mutateAsync(values);
    },
    successMessage: 'Review created successfully',
    showValidationAlert: true,
  });

  if (!me) return <span>You are not logged in</span>;

  return (
    <Segment title="New Review">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps}></Alert>
          <Button {...buttonProps}>Create review</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
