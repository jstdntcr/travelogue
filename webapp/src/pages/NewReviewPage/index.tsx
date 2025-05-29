import { zCreateReviewTrpcInput } from '@travelogue/backend/src/router/createReview/input';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';
import { useForm } from '../../lib/form';
import { getAllReviewsRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const NewReviewPage = () => {
  const { data } = trpc.getMe.useQuery();
  const trpcUtils = trpc.useUtils();
  const navigate = useNavigate();
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

  void trpcUtils.invalidate();
  if (!data?.me) {
    navigate(getAllReviewsRoute());
  }

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
