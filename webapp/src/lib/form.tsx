import { type FormikHelpers } from 'formik';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { useMemo } from 'react';
import { z } from 'zod';
import { type AlertProps } from '../components/Alert';
import { type ButtonProps } from '../components/Button';

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues,
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any;
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues: initialValues || ({} as any),
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      try {
        setSubmittingError(null);
        await onSubmit(values, formikHelpers);
        if (resetOnSuccess) formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error);
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        color: 'red',
        children: submittingError.message,
        hidden: false,
      };
    }

    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        color: 'red',
        children: 'Some fields are invalid',
        hidden: false,
      };
    }

    if (successMessageVisible) {
      return {
        color: 'green',
        children: successMessage,
        hidden: false,
      };
    }

    return {
      color: 'red',
      children: null,
      hidden: true,
    };
  }, [successMessageVisible, submittingError, formik.isValid, showValidationAlert, successMessage]);

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return { loading: formik.isSubmitting };
  }, [formik.isSubmitting]);

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
