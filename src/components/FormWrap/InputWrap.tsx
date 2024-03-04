import { InputHTMLAttributes, KeyboardEvent } from "react";
import { UseControllerProps, useController } from "react-hook-form";

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  preventEnterKey?: boolean;
  formField: UseControllerProps;
};
function InputWrap(props: BaseInputProps) {
  const { preventEnterKey, formField, ...baseProps } = props;
  const {
    field,
    fieldState: { invalid },
  } = useController(formField);

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      return;
    }
  };

  return (
    <input
      {...field}
      {...baseProps}
      aria-invalid={invalid}
      onKeyDown={preventEnterKey ? undefined : handleEnterKey}
    />
  );
}

export default InputWrap;
