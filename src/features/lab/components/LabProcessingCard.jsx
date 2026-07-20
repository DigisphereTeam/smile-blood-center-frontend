import { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

import AppCard from "../../../components/common/AppCard";
import AppButton from "../../../components/common/AppButton";
import WorkflowStepper from "../../../components/common/WorkflowStepper";

import BloodGroupingForm from "./BloodGroupingForm";
import DonorDetailsForm from "./DonorDetailsForm";
import CrossMatchingForm from "./CrossMatchingForm";

import { getInitialLabFormData } from "../../../utils/labFormData";

import {
  COMPATIBILITY_STATUS,
  REQUISITION_STATUS,
} from "../../../constants/statusConstants";

import {
  saveCompatibilityReport,
  getCompatibilityReportByRequisitionId,
} from "../../storage/compatibilityStorageApi";

import { getDonors } from "../../storage/donorStorageApi";

const steps = [
  "Blood Grouping",
  "Donor Details",
  "Cross Matching",
];

const LabProcessingCard = ({
  patient,
  onSubmit,
}) => {
  const [activeStep, setActiveStep] =
    useState(0);

  const [formData, setFormData] = useState(
    getInitialLabFormData(patient)
  );

  useEffect(() => {
    if (!patient) return;

    setActiveStep(
      patient.lab?.currentStep ?? 0
    );

    setFormData(
      getInitialLabFormData(patient)
    );
  }, [patient]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateCurrentStep = () => {
    switch (activeStep) {
      case 0:
        return (
          formData.confirmedABOGroup &&
          formData.confirmedRhType
        );

      case 1:
        return (
          formData.unitNumber &&
          formData.donorBloodGroup &&
          formData.collectionDate &&
          formData.expiryDate &&
          formData.component &&
          formData.volume &&
          formData.viralScreening
        );

      case 2:
        return (
          formData.unitNumber &&
          formData.donorBloodGroup &&
          formData.component &&
          formData.collectionDate &&
          formData.expiryDate &&
          formData.issueNumber &&
          formData.crossMatchResult
        );

      default:
        return true;
    }
  };

  const savePatient = (
    completed = false
  ) => {
    if (!validateCurrentStep()) {
      toast.warning(
        "Please complete all required fields."
      );
      return;
    }

    const updatedPatient = {
      ...patient,

      status: completed
        ? REQUISITION_STATUS.COMPLETED
        : REQUISITION_STATUS.IN_PROGRESS,

      lab: {
        ...patient.lab,

        technician:
          patient.lab?.technician ||
          "Lab Technician",

        startedAt:
          patient.lab?.startedAt ||
          new Date().toISOString(),

        completedAt: completed
          ? new Date().toISOString()
          : null,

        currentStep: completed
          ? steps.length - 1
          : activeStep + 1,

        bloodGrouping: {
          confirmedABOGroup:
            formData.confirmedABOGroup,
          confirmedRhType:
            formData.confirmedRhType,
        },

        donorDetails: {
          unitNo: formData.unitNumber,
          bloodGroup:
            formData.donorBloodGroup,
          rhType: formData.donorRhType,
          collectionDate:
            formData.collectionDate?.toISOString() ??
            null,
          expiryDate:
            formData.expiryDate?.toISOString() ??
            null,
          component: formData.component,
          volume: formData.volume,
          viralScreening:
            formData.viralScreening,
        },

        crossMatching: {
          bloodGroup:
            formData.donorBloodGroup,
          donorComponent:
            formData.component,
          collectionDate:
            formData.collectionDate?.toISOString() ??
            null,
          expiryDate:
            formData.expiryDate?.toISOString() ??
            null,
          issueNumber:
            formData.issueNumber,
          crossMatchingResult:
            formData.crossMatchResult,
        },

        compatibilityStatus:
          completed
            ? COMPATIBILITY_STATUS.COMPATIBLE
            : COMPATIBILITY_STATUS.PENDING,
      },
    };

    onSubmit(updatedPatient);

    if (completed) {
      const existingReport =
        getCompatibilityReportByRequisitionId(
          patient.requisitionId
        );

      if (!existingReport) {
        const donor = getDonors().find(
          (d) =>
            d.unitNumber ===
            formData.unitNumber
        );

        saveCompatibilityReport({
          id: crypto.randomUUID(),

          reportId: `SMBB-${String(
            Date.now()
          ).slice(-3)}`,

          requisitionId:
            patient.requisitionId,

          patientId: patient.id,

          patientName:
            patient.patientName,

          donorId: donor?.donorId,

          donorName:
            donor?.donorName,

          unitNumber:
            formData.unitNumber,

          bloodGroup: `${formData.donorBloodGroup}${
            formData.donorRhType ===
            "Positive"
              ? "+"
              : "-"
          }`,

          component:
            formData.component,

          crossMatchResult:
            formData.crossMatchResult,

          compatibilityStatus:
            COMPATIBILITY_STATUS.COMPATIBLE,

          technician:
            updatedPatient.lab
              .technician,

          createdAt:
            new Date().toISOString(),
        });
      }

      toast.success(
        "Lab processing completed successfully."
      );

      return;
    }

    toast.success("Progress saved.");

    setActiveStep((prev) => prev + 1);
  };

  if (!patient) return null;

  return (
    <AppCard>
      <Stack spacing={3}>
        <Typography
          variant="h6"
          fontWeight={600}
        >
          Lab Processing Workflow
        </Typography>

        <WorkflowStepper
          steps={steps}
          activeStep={activeStep}
        />

        <Divider />

        {activeStep === 0 && (
          <BloodGroupingForm
            patient={patient}
            formData={formData}
            onChange={handleChange}
          />
        )}

        {activeStep === 1 && (
          <DonorDetailsForm
            patient={patient}
            formData={formData}
            onChange={handleChange}
          />
        )}

        {activeStep === 2 && (
          <CrossMatchingForm
            formData={formData}
            onChange={handleChange}
          />
        )}

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
          }}
        >
          {activeStep > 0 ? (
            <AppButton
              variant="outlined"
              onClick={() =>
                setActiveStep(
                  (prev) => prev - 1
                )
              }
            >
              Back
            </AppButton>
          ) : (
            <Box />
          )}

          {activeStep ===
          steps.length - 1 ? (
            <AppButton
              color="success"
              onClick={() =>
                savePatient(true)
              }
            >
              Submit
            </AppButton>
          ) : (
            <AppButton
              onClick={() =>
                savePatient(false)
              }
            >
              Next
            </AppButton>
          )}
        </Box>
      </Stack>
    </AppCard>
  );
};

export default LabProcessingCard;