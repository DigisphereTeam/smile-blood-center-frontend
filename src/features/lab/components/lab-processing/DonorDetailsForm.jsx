import { useEffect, useMemo } from "react";
import { Grid } from "@mui/material";
import dayjs from "dayjs";

import AppSelect from "../../../../components/common/AppSelect";
import FormDateTimePicker from "../../../../components/common/FormDateTimePicker";

import { getDonors } from "../../../storage/donorStorageApi";

import { viralScreeningOptions } from "../../../../constants/labMockData";

const DonorDetailsForm = ({
  patient,
  formData,
  onChange,
}) => {
  const donors = getDonors();

  // Patient blood group
  const patientABO =
    patient?.bloodGroup?.replace("+", "").replace("-", "");

  const patientRh =
    patient?.bloodGroup?.endsWith("+")
      ? "Positive"
      : "Negative";

  // Required component
  const requiredComponent =
    patient?.bloodComponents?.[0]?.component;

  // Matching donors
  const matchingDonors = useMemo(() => {
    return donors.filter(
      (donor) =>
        donor.status === "AVAILABLE" &&
        donor.bloodGroup === patientABO &&
        donor.rhType === patientRh &&
        donor.component === requiredComponent
    );
  }, [
    donors,
    patientABO,
    patientRh,
    requiredComponent,
  ]);

  // Auto-fill donor details
  useEffect(() => {
    if (!formData.unitNumber) return;

    const donor = matchingDonors.find(
      (d) => d.unitNumber === formData.unitNumber
    );

    if (!donor) return;

    onChange("donorBloodGroup", donor.bloodGroup);
    onChange("donorRhType", donor.rhType);
    onChange("component", donor.component);
    onChange("volume", donor.volume);
    onChange(
      "collectionDate",
      donor.collectionDate
        ? dayjs(donor.collectionDate)
        : null
    );
    onChange(
      "expiryDate",
      donor.expiryDate
        ? dayjs(donor.expiryDate)
        : null
    );
  }, [formData.unitNumber]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <AppSelect
          label="Select Donor Unit *"
          value={formData.unitNumber}
          onChange={(e) =>
            onChange("unitNumber", e.target.value)
          }
          options={matchingDonors.map((donor) => ({
            value: donor.unitNumber,
            label: `${donor.unitNumber} • ${donor.donorName} • ${donor.bloodGroup}${donor.rhType === "Positive" ? "+" : "-"} • ${donor.component.toUpperCase()}`,
          }))}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Blood Group"
          value={formData.donorBloodGroup}
          disabled
          options={[
            {
              label: formData.donorBloodGroup || "-",
              value: formData.donorBloodGroup || "",
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Rh Type"
          value={formData.donorRhType}
          disabled
          options={[
            {
              label: formData.donorRhType || "-",
              value: formData.donorRhType || "",
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
          label="Blood Component"
          value={formData.component}
          disabled
          options={[
            {
              label: formData.component?.toUpperCase() || "-",
              value: formData.component || "",
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Volume"
          value={formData.volume}
          disabled
          options={[
            {
              label: formData.volume
                ? `${formData.volume} ml`
                : "-",
              value: formData.volume || "",
            },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppSelect
          label="Viral Screening *"
          value={formData.viralScreening}
          onChange={(e) =>
            onChange(
              "viralScreening",
              e.target.value
            )
          }
          options={viralScreeningOptions}
        />
      </Grid>
    </Grid>
  );
};

export default DonorDetailsForm;