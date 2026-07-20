import { Grid } from "@mui/material";

import AppSelect from "../../../components/common/AppSelect";
import FormDateTimePicker from "../../../components/common/FormDateTimePicker";
import FormTextField from "../../../components/common/FormTextField";

import { crossMatchResultOptions } from "../../../constants/labMockData";

const CrossMatchingForm = ({
  formData,
  onChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Group"
          value={formData.donorBloodGroup}
          disabled
          options={[
            {
              label:
                formData.donorBloodGroup || "-",
              value:
                formData.donorBloodGroup || "",
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Component"
          value={formData.component}
          disabled
          options={[
            {
              label:
                formData.component || "-",
              value:
                formData.component || "",
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormDateTimePicker
          label="Collection Date"
          value={formData.collectionDate}
          disabled
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormDateTimePicker
          label="Expiry Date"
          value={formData.expiryDate}
          disabled
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Cross Match Result *"
          value={formData.crossMatchResult}
          onChange={(e) =>
            onChange(
              "crossMatchResult",
              e.target.value
            )
          }
          options={crossMatchResultOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Issue Number"
          value={formData.issueNumber}
          onChange={(e) =>
            onChange(
              "issueNumber",
              e.target.value
            )
          }
        />
      </Grid>
    </Grid>
  );
};

export default CrossMatchingForm;