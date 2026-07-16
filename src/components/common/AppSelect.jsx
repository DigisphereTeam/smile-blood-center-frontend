import { MenuItem, TextField } from "@mui/material";

const AppSelect = ({
  label,
  value,
  onChange,
  options = [],
  size = "small",
  fullWidth = true,
  ...props
}) => {
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      size={size}
      fullWidth={fullWidth}
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
  );
};

export default AppSelect;