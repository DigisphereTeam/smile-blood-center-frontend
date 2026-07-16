import { Collapse, Grid, Switch, FormControlLabel } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import AppCard from "../../../components/common/AppCard";
import SectionHeader from "../../../components/common/SectionHeader";
import RHFSelect from "../../../components/common/RHFSelect";
import RHFTextField from "../../../components/common/RHFTextField";

const requirementOptions = [
  {
    label: "5 Mins Only By Grouping",
    value: "5_mins_grouping",
  },
  {
    label: "30 Mins Saline X Matching",
    value: "30_mins_saline_xmatch",
  },
  {
    label: "2 Hrs Complete X Matching",
    value: "2_hrs_complete_xmatch",
  },
];

const EmergencyDetails = ({ control }) => {
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
              />
            }
          />
        )}
      />

      <Collapse in={isEmergency} timeout={300}>
        <Grid container spacing={3} mt={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <RHFSelect
              control={control}
              name="requirementSelection"
              label="Requirement Selection"
              options={requirementOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <RHFTextField
              control={control}
              name="physicianName"
              label="Doctor Name"
            />
          </Grid>
        </Grid>
      </Collapse>
    </AppCard>
  );
};

export default EmergencyDetails;
