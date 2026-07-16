import { Grid } from "@mui/material";

import AppSelect from "../../../components/common/AppSelect";
import FormDateTimePicker from "../../../components/common/FormDateTimePicker";

import {
  bloodGroups,
  bloodComponents,
} from "../../../constants/frontDeskMockData";

import {
  unitNumberOptions,
  volumeOptions,
  viralScreeningOptions,
} from "../../../constants/labMockData";

const DonorDetailsForm = ({ formData, onChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Unit Number"
          value={formData.unitNumber}
          onChange={(e) =>
            onChange("unitNumber", e.target.value)
          }
          options={unitNumberOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Group"
          value={formData.donorBloodGroup}
          onChange={(e) =>
            onChange("donorBloodGroup", e.target.value)
          }
          options={bloodGroups.map((group) => ({
            label: group,
            value: group,
          }))}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormDateTimePicker
          label="Collection Date"
          value={formData.collectionDate}
          onChange={(value) =>
            onChange("collectionDate", value)
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormDateTimePicker
          label="Expiry Date"
          value={formData.expiryDate}
          onChange={(value) =>
            onChange("expiryDate", value)
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Component"
          value={formData.component}
          onChange={(e) =>
            onChange("component", e.target.value)
          }
          options={bloodComponents.map((component) => ({
            label: component.name,
            value: component.value,
          }))}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Volume"
          value={formData.volume}
          onChange={(e) =>
            onChange("volume", e.target.value)
          }
          options={volumeOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Viral Screening"
          value={formData.viralScreening}
          onChange={(e) =>
            onChange("viralScreening", e.target.value)
          }
          options={viralScreeningOptions}
        />
      </Grid>
    </Grid>
  );
};

export default DonorDetailsForm;