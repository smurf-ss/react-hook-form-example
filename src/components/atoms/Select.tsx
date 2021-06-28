import React from "react";

import { Control, useController, Validate } from "react-hook-form";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import SelectMaterial, {
  SelectProps as SelectMaterialProps,
} from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { textRequiredValidate } from "../../utils/hook-form-validator";

type SelectOptions = { [key: string]: any };

type SelectProps = {
  name: string;
  control: Control<any>;
  selectProps?: SelectMaterialProps & { label?: string };
  required?: boolean | { required: boolean; message: string };
  validates?: FunctionValidate[];
  options: SelectOptions[];
  keyNameOptionLabel?: keyof SelectOptions;
  keyNameOptionValue?: keyof SelectOptions;
  optionEmptyLabel?: string;
};

const Select: React.FC<SelectProps> = ({
  name,
  control,
  selectProps,
  required = false,
  validates = [],
  keyNameOptionLabel = "label",
  keyNameOptionValue = "value",
  optionEmptyLabel = "None",
  options = [],
}) => {
  const isRequired =
    typeof required === "boolean" ? required : required.required;

  const validateObject = Object.assign(
    {},
    validates
  ) as unknown as Validate<any>;

  const {
    field: { ref, ...fieldSelect },
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
    defaultValue: "",
  });

  const isValid =
    (!!error?.message && isTouched) || (!!error?.message && invalid);

  return (
    <FormControl fullWidth={true} error={isValid}>
      <InputLabel required={isRequired} shrink>
        {selectProps?.label}
      </InputLabel>
      <SelectMaterial
        {...fieldSelect}
        inputRef={ref}
        {...selectProps}
        displayEmpty>
        {!isRequired && <MenuItem value={""}>{optionEmptyLabel}</MenuItem>}
        {options.map((option) => (
          <MenuItem
            value={option[keyNameOptionValue]}
            key={option[keyNameOptionValue]}>
            {option[keyNameOptionLabel]}
          </MenuItem>
        ))}
      </SelectMaterial>
      <FormHelperText error={isValid}>{error?.message}</FormHelperText>
    </FormControl>
  );
};

export default Select;
