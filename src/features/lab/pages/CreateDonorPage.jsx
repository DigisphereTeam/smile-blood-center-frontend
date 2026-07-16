import { useState } from "react";
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
      formData.component &&
      formData.collectionDate
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.warning("Please fill all required fields.");
      return;
    }

    const donor = {
      ...formData,

      donorId: generateDonorId(),
      unitNumber: generateUnitNumber(),

      status: "AVAILABLE",

      collectionDate:
        formData.collectionDate?.toISOString() ?? null,

      expiryDate:
        formData.expiryDate?.toISOString() ?? null,

      createdAt: new Date().toISOString(),
    };

    addDonor(donor);

    toast.success("Donor registered successfully.");

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