import { zSignInTrpcInput } from '@travelogue/backend/src/router/signIn/input';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { trpc } from '../../lib/trpc';

export const SignInPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const signIn = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await signIn.mutateAsync(values);
        setSuccessMessageVisible(true);
        formik.resetForm();
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik}></Input>
          <Input name="password" label="Password" type="password" formik={formik}></Input>
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {!!submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Sign In Successful</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
