import { zSignUpTrpcInput } from '@travelogue/backend/src/router/signUp/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { useForm } from '../../lib/form';
import { getAllReviewsRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signUp.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['passwordAgain'],
          });
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token-travelogue', token, { expires: 999999 });
      void trpcUtils.invalidate();
      navigate(getAllReviewsRoute());
    },
    resetOnSuccess: false,
    successMessage: 'Sign up successful',
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input name="nick" label="Nick" formik={formik}></Input>
          <Input name="password" label="Password" type="password" formik={formik}></Input>
          <Input name="passwordAgain" label="Password Again" type="password" formik={formik}></Input>
          <Alert {...alertProps}></Alert>
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
