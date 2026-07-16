import { Grid } from "@mui/material";

import AppSelect from "../../../components/common/AppSelect";
import FormDateTimePicker from "../../../components/common/FormDateTimePicker";
import FormTextField from "../../../components/common/FormTextField";

import {
  bloodGroups,
  bloodComponents,
} from "../../../constants/frontDeskMockData";

import { crossMatchResultOptions } from "../../../constants/labMockData";

const CrossMatchingForm = ({ formData, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Group"
          value={formData.crossMatchBloodGroup}
          onChange={(e) =>
            onChange("crossMatchBloodGroup", e.target.value)
          }
          options={bloodGroups.map((group) => ({
            label: group,
            value: group,
          }))}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Donor Component"
          value={formData.donorComponent}
          onChange={(e) =>
            onChange("donorComponent", e.target.value)
          }
          options={bloodComponents.map((component) => ({
            label: component.name,
            value: component.value,
          }))}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormDateTimePicker
          label="Collection Date"
          value={formData.crossCollectionDate}
          onChange={(value) =>
            onChange("crossCollectionDate", value)
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormDateTimePicker
          label="Expiry Date"
          value={formData.crossExpiryDate}
          onChange={(value) =>
            onChange("crossExpiryDate", value)
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Cross Matching Result"
          value={formData.crossMatchResult}
          onChange={(e) =>
            onChange("crossMatchResult", e.target.value)
          }
          options={crossMatchResultOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Issue Number"
          value={formData.issueNumber}
          onChange={(e) =>
            onChange("issueNumber", e.target.value)
          }
        />
      </Grid>
    </Grid>
  );
};

export default CrossMatchingForm;