import { Controller } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

const FormCheckbox = ({
  name,
  control,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              checked={field.value}
              onChange={(e) =>
                field.onChange(e.target.checked)
              }
            />
          }
        />
      )}
    />
  );
};

export default FormCheckbox;