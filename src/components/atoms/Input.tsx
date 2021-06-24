import { Control, useController, Validate } from "react-hook-form";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { textRequiredValidate } from "../../utils/hook-form-validator";

type InputProps = {
  name: string;
  control: Control<any>;
  inputProps?: TextFieldProps;
  required?: boolean | { required: boolean; message: string };
  validates?: FunctionValidate[];
};

const Input: React.FC<InputProps> = ({
  name,
  control,
  inputProps,
  required = false,
  validates = [],
}) => {
  const validateObject = Object.assign(
    {},
    validates
  ) as unknown as Validate<any>;

  const {
    field: { ref, ...fieldInput },
    fieldState: { invalid, isTouched, error },
    // formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: {
      required: false,
      validate: {
        required: (value: string) => {
          if (typeof required === "object" && required.required) {
            return textRequiredValidate(value)(required.message);
          }

          if (typeof required === "boolean" && required) {
            return textRequiredValidate(value)();
          }
          return undefined;
        },
        ...validateObject,
      },
    },
    defaultValue: "",
  });

  const isValid =
    (!!error?.message && isTouched) || (!!error?.message && invalid);

  return (
    <FormControl>
      <TextField
        {...fieldInput}
        inputRef={ref}
        {...inputProps}
        error={isValid}
      />
      <FormHelperText error={isValid}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default Input;
