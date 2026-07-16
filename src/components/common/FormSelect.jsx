import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

const FormSelect = ({
  name,
  control,
  label,
  options = [],
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          fullWidth
          size="small"
          label={label}
          required={required}
          disabled={disabled}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...props}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value ?? option}
              value={option.value ?? option}
            >
              {option.label ?? option}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default FormSelect;