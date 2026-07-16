import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const RHFTextField = ({
  control,
  name,
  label,
  type = "text",
  multiline = false,
  rows = 4,
  required = false,
  disabled = false,
  fullWidth = true,
  size = "small",
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          value={field.value ?? ""}
          label={label}
          type={type}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          size={size}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...props}
        />
      )}
    />
  );
};

export default RHFTextField;