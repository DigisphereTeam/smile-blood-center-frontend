import { Controller } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const RHFSelect = ({
  name,
  control,
  label,
  options = [],
  fullWidth = true,
  size = "small",
  isBoolean = false,
  disabled = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          fullWidth={fullWidth}
          size={size}
          error={!!fieldState.error}
          disabled={disabled}
        >
          {label && <InputLabel>{label}</InputLabel>}

          <Select
            {...props}
            label={label}
            value={
              isBoolean
                ? String(field.value)
                : (field.value ?? "")
            }
            onChange={(e) =>
              field.onChange(
                isBoolean
                  ? e.target.value === "true"
                  : e.target.value
              )
            }
          >
            {options.map((option) => (
              <MenuItem
                key={String(option.value)}
                value={
                  isBoolean
                    ? String(option.value)
                    : option.value
                }
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>
            {fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RHFSelect;