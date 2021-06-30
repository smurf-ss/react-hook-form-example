import { Control, useController, Validate } from "react-hook-form";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import InputMaterial, {
  InputProps as InputMaterialProps,
} from "@material-ui/core/Input";

import { textRequiredValidate } from "@utils/hook-form-validator";

type InputProps = {
  name: string;
  control: Control<any>;
  inputProps?: InputMaterialProps & { label?: string };
  required?: boolean | { required: boolean; message: string };
  validates?: FunctionValidate[];
  defaultValue?: any;
};

const Input: React.FC<InputProps> = ({
  name,
  control,
  inputProps,
  required = false,
  validates = [],
  defaultValue = "",
}) => {
  const isRequired =
    typeof required === "boolean" ? required : required.required;

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
            return textRequiredValidate(required.message)(value);
          }

          if (typeof required === "boolean" && required) {
            return textRequiredValidate()(value);
          }
          return undefined;
        },
        ...validateObject,
      },
    },
    defaultValue,
  });

  // console.log("rendering", name, fieldInput);

  const isValid =
    (!!error?.message && isTouched) || (!!error?.message && invalid);

  return (
    <FormControl error={isValid} fullWidth={true}>
      <InputLabel required={isRequired && !!inputProps?.label}>
        {inputProps?.label}
      </InputLabel>
      <InputMaterial {...fieldInput} inputRef={ref} {...inputProps} />
      <FormHelperText error={isValid}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default Input;
