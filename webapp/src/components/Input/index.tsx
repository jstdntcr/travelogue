import cn from 'classnames';
import { type FormikProps } from 'formik';
import css from './index.module.scss';

export const Input = ({ name, label, formik, maxWidth }: { name: string; label: string; formik: FormikProps<any>, maxWidth?: number }) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const disabled = formik.isSubmitting;
  const invalid = !!touched && error;

  return (
    <div className={cn({[css.field]: true, [css.disabled]: !!disabled})}>
      <label className={css.label} htmlFor={name}>{label}</label>
      <input
      className={cn({[css.input]: true, [css.invalid]: !!invalid})}
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name, true);
        }}
        style={{ maxWidth }}
        value={value}
        name={name}
        id={name}
        disabled={disabled}
      />
      {invalid && <div className={css.error} style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
