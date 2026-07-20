import { Grid } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import FormTextField from "../../../../components/common/FormTextField";
import AppSelect from "../../../../components/common/AppSelect";

import {
  bloodComponents,
  genderOptions,
} from "../../../../constants/frontdeskMockData";

import {
  donationTypeOptions,
  collectionVolumeOptions,
} from "../../../../constants/donorMockData";

const bloodGroupOptions = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "AB",
    value: "AB",
  },
  {
    label: "O",
    value: "O",
  },
];

const rhTypeOptions = [
  {
    label: "Positive (+)",
    value: "Positive",
  },
  {
    label: "Negative (-)",
    value: "Negative",
  },
];

const DonorRegistrationForm = ({
  formData,
  onChange,
}) => {
  return (
    <Grid container spacing={2}>
      {/* Donor Name */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Donor Name *"
          value={formData.donorName}
          onChange={(e) =>
            onChange("donorName", e.target.value)
          }
        />
      </Grid>

      {/* Age */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Age *"
          type="number"
          value={formData.age}
          onChange={(e) =>
            onChange("age", e.target.value)
          }
        />
      </Grid>

      {/* Gender */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Gender *"
          value={formData.gender}
          onChange={(e) =>
            onChange("gender", e.target.value)
          }
          options={genderOptions}
        />
      </Grid>

      {/* Mobile Number */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Mobile Number *"
          value={formData.mobileNumber}
          onChange={(e) =>
            onChange("mobileNumber", e.target.value)
          }
        />
      </Grid>

      {/* Blood Group (ABO) */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Group (ABO) *"
          value={formData.bloodGroup}
          onChange={(e) =>
            onChange("bloodGroup", e.target.value)
          }
          options={bloodGroupOptions}
        />
      </Grid>

      {/* Rh Type */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Rh Type *"
          value={formData.rhType}
          onChange={(e) =>
            onChange("rhType", e.target.value)
          }
          options={rhTypeOptions}
        />
      </Grid>

      {/* Blood Component */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Component *"
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

      {/* Donation Type */}
      {/* <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Donation Type *"
          value={formData.donationType}
          onChange={(e) =>
            onChange("donationType", e.target.value)
          }
          options={donationTypeOptions}
        />
      </Grid> */}

      {/* Collection Volume */}
      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Collection Volume *"
          value={formData.volume}
          onChange={(e) =>
            onChange("volume", e.target.value)
          }
          options={collectionVolumeOptions}
        />
      </Grid>

      {/* Weight */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={(e) =>
            onChange("weight", e.target.value)
          }
        />
      </Grid>

      {/* Hemoglobin */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Hemoglobin (g/dL)"
          value={formData.hemoglobin}
          onChange={(e) =>
            onChange("hemoglobin", e.target.value)
          }
        />
      </Grid>

      {/* Blood Pressure */}
      <Grid size={{ xs: 12, md: 6 }}>
        <FormTextField
          label="Blood Pressure"
          placeholder="120/80"
          value={formData.bloodPressure}
          onChange={(e) =>
            onChange("bloodPressure", e.target.value)
          }
        />
      </Grid>

      {/* Collection Date */}
      <Grid size={{ xs: 12, md: 6 }}>
        <DateTimePicker
          label="Collection Date *"
          value={formData.collectionDate}
          onChange={(value) =>
            onChange("collectionDate", value)
          }
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DonorRegistrationForm;