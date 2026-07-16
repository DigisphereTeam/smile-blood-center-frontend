import { Grid } from "@mui/material";
import {
  bloodGroups,
  genderOptions,
  rhOptions,
} from "../../../constants/frontdeskMockData";
import AppCard from "../../../components/common/AppCard";
import SectionHeader from "../../../components/common/SectionHeader";
import FormSelect from "../../../components/common/FormSelect";
import RHFTextField from "../../../components/common/RHFTextField";

const PatientDetailsForm = ({ control }) => {
  return (
    <AppCard sx={{mb:2}}>
      <SectionHeader title="Step 1 : Patient Details" />

      <Grid container spacing={3}>
         {/* Row 1  */}

        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            control={control}
            name="patientName"
            label="Patient Name"
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            control={control}
            name="hospital"
            label="Hospital Name"
            required
          />
        </Grid>

        {/* Row 2 */}

        <Grid size={{ xs: 12, md: 4 }}>
          <FormSelect
            control={control}
            name="bloodGroup"
            label="Blood Group"
            options={bloodGroups}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <RHFTextField
            control={control}
            name="age"
            label="Age"
            type="number"
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <RHFTextField
            control={control}
            name="diagnosis"
            label="Diagnosis"
            required
          />
        </Grid>

        {/* Row 3 */}

        <Grid size={{ xs: 12, md: 4 }}>
          <FormSelect
            control={control}
            name="rhType"
            label="Rh.D"
            options={rhOptions}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <FormSelect
            control={control}
            name="gender"
            label="Gender"
            options={genderOptions}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <RHFTextField
            control={control}
            name="ipNumber"
            label="IP Number"
            required
          />
        </Grid>

        {/* Row 4 */}

        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            control={control}
            name="referredBy"
            label="Referred By"
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RHFTextField
            control={control}
            name="wardNumber"
            label="Ward Number"
          />
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default PatientDetailsForm;
