import { useState } from "react";
import dayjs from "dayjs";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageHeader from "../../../components/common/PageHeader";
import AppCard from "../../../components/common/AppCard";
import AppButton from "../../../components/common/AppButton";

import DonorRegistrationForm from "../components/donor/DonorRegistrationForm";

import { getInitialDonorFormData } from "../../../utils/donorFormData";

import {
  addDonor,
  generateDonorId,
  generateUnitNumber,
} from "../../storage/donorStorageApi";

const CreateDonorPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    getInitialDonorFormData()
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.donorName &&
      formData.age &&
      formData.gender &&
      formData.mobileNumber &&
      formData.bloodGroup &&
      formData.rhType &&
      formData.component &&
      formData.collectionDate
    );
  };

  // Generate expiry date based on blood component
  const getExpiryDate = (
    component,
    collectionDate
  ) => {
    const date = dayjs(collectionDate);

    switch (component) {
      case "whole_blood":
        return date.add(35, "day");

      case "packed_cells":
        return date.add(42, "day");

      case "platelets":
        return date.add(5, "day");

      case "ffp":
        return date.add(1, "year");

      case "cryoprecipitate":
        return date.add(1, "year");

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.warning("Please fill all required fields.");
      return;
    }

    const expiryDate = getExpiryDate(
      formData.component,
      formData.collectionDate
    );

    const donor = {
      donorId: generateDonorId(),
      unitNumber: generateUnitNumber(),

      donorName: formData.donorName,
      age: Number(formData.age),
      gender: formData.gender,
      mobileNumber: formData.mobileNumber,

      // Blood Details
      bloodGroup: formData.bloodGroup,
      rhType: formData.rhType,
      component: formData.component,

      // Donation Details
      donationType: formData.donationType,
      volume: formData.volume,

      // Medical Details
      weight: formData.weight
        ? Number(formData.weight)
        : null,
      hemoglobin: formData.hemoglobin,
      bloodPressure: formData.bloodPressure,

      // Dates
      collectionDate:
        formData.collectionDate?.toISOString() ??
        null,

      expiryDate:
        expiryDate?.toISOString() ?? null,

      // Inventory
      status: "AVAILABLE",

      createdAt: new Date().toISOString(),
    };

    addDonor(donor);

    toast.success(
      "Donor registered successfully."
    );

    navigate("/donor-registration");
  };

  return (
    <>
      <PageHeader
        title="Register Donor"
        subtitle="Register a blood donor and create a blood unit."
      />

      <AppCard>
        <Stack spacing={3}>
          <DonorRegistrationForm
            formData={formData}
            onChange={handleChange}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
          >
            <AppButton
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Cancel
            </AppButton>

            <AppButton onClick={handleSubmit}>
              Register Donor
            </AppButton>
          </Stack>
        </Stack>
      </AppCard>
    </>
  );
};

export default CreateDonorPage;