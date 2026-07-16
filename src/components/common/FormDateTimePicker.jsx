import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const FormDateTimePicker = ({
  label,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <DateTimePicker
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      slotProps={{
        textField: {
          fullWidth: true,
          size: "small",
        },
      }}
    />
  );
};

export default FormDateTimePicker;