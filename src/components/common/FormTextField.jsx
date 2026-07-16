import { TextField } from "@mui/material";

const FormTextField = ({
  label,
  value,
  onChange,
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
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      {...props}
    />
  );
};

export default FormTextField;