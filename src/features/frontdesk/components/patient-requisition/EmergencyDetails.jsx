import { Collapse, FormControlLabel, Grid, Switch } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";

import AppCard from "../../../../components/common/AppCard";
import SectionHeader from "../../../../components/common/SectionHeader";
import RHFSelect from "../../../../components/common/RHFSelect";
import RHFTextField from "../../../../components/common/RHFTextField";

const compatibilityTestOptions = [
  {
    label: "5 Mins Only By Grouping",
    value: "5_mins_grouping",
  },
  {
    label: "30 Mins Saline X Matching",
    value: "30_mins_saline_x_match",
  },
  {
    label: "2 Hrs Complete X Matching",
    value: "2_hrs_complete_x_match",
  },
];

const EmergencyDetails = ({ control, disabled = false }) => {
  const isEmergency = useWatch({
    control,
    name: "isEmergency",
  });

  return (
    <AppCard>
      <SectionHeader title="Step 4 : Emergency Request" />

      <Controller
        control={control}
        name="isEmergency"
        render={({ field }) => (
          <FormControlLabel
            label="Mark as Emergency Request"
            control={
              <Switch
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                disabled={disabled}
              />
            }
          />
        )}
      />

      <Collapse in={isEmergency} timeout={300}>
        <Grid container spacing={3} mt={1}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 3 }}>
            <RHFSelect
              control={control}
              name="requirementSelection"
              label="Compatibility Test Type"
              options={compatibilityTestOptions}
              disabled={disabled}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{ mt: 3 }}>
            <RHFTextField
              control={control}
              name="physicianName"
              label="Physician Name"
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Collapse>
    </AppCard>
  );
};

export default EmergencyDetails;