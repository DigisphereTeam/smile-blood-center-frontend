import { Grid, Stack, Typography } from "@mui/material";

import InfoAlert from "../../../components/common/InfoAlert";
import AppSelect from "../../../components/common/AppSelect";

const BloodGroupingForm = ({
  patient,
  formData,
  onChange,
}) => {
  return (
    <Stack spacing={3}>
      <InfoAlert title="Why re-confirm blood group?">
        For patient safety, the laboratory must verify the blood group through
        testing, even if the patient's blood group is already known. This helps
        prevent transfusion errors.
      </InfoAlert>

      <Stack spacing={0.5}>
        <Typography
          variant="body2"
          color="text.secondary"
          fontWeight={500}
        >
          Patient&apos;s Reported Blood Group
        </Typography>

        <Typography
          variant="h4"
          color="secondary.main"
          fontWeight={700}
        >
          {patient?.bloodGroup}
          {/* {patient?.rhType === "Positive" ? "+" : "-"} */}
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <AppSelect
            label="Lab Confirmed ABO Group *"
            value={formData.confirmedABOGroup}
            onChange={(e) =>
              onChange("confirmedABOGroup", e.target.value)
            }
            options={[
              { label: "Select ABO Group", value: "" },
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "AB", value: "AB" },
              { label: "O", value: "O" },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <AppSelect
            label="Lab Confirmed Rh Type *"
            value={formData.confirmedRhType}
            onChange={(e) =>
              onChange("confirmedRhType", e.target.value)
            }
            options={[
              { label: "Select Rh Type", value: "" },
              { label: "Positive", value: "Positive" },
              { label: "Negative", value: "Negative" },
            ]}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default BloodGroupingForm;