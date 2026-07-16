import { Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const FormRadioGroup = ({
  name,
  control,
  label,
  options = [],
  row = true,
  isBoolean = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          {label && (
            <FormLabel sx={{ mb: 1, fontWeight: 500 }}>
              {label}
            </FormLabel>
          )}

          <RadioGroup
            value={isBoolean ? String(field.value) : field.value}
            onChange={(e) =>
              field.onChange(
                isBoolean ? e.target.value === "true" : e.target.value
              )
            }
            row={row}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={isBoolean ? String(option.value) : option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;