import { ReactNode } from "react";
import { useForm, FormProvider, UseFormProps } from "react-hook-form";

type FormProps = UseFormProps & {
  className?: string;
  children: ReactNode;
  onSubmit: (values: UseFormProps["defaultValues"]) => void;
};

function FromWrap(props: FormProps) {
  const { className, children, onSubmit, ...formProps } = props;
  const methods = useForm(formProps);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

export default FromWrap;
