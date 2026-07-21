import { Box, CircularProgress, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import PageHeader from "../../../components/common/PageHeader";
import AppButton from "../../../components/common/AppButton";

import PatientDetailsForm from "../components/patient-requisition/PatientDetailsForm";
import TransfusionIndication from "../components/patient-requisition/TransfusionIndication";
import BloodComponentTable from "../components/patient-requisition/BloodComponentTable";
import EmergencyDetails from "../components/patient-requisition/EmergencyDetails";

import { patientRequisitionSchema } from "../schemas/patientRequisition.schema";
import { bloodComponents } from "../../../constants/frontdeskMockData";

import { usePatientRequisition } from "../hooks/usePatientRequisition";
import { useUpdatePatientRequisition } from "../hooks/useUpdatePatientRequisition";

const PatientRequisitionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = usePatientRequisition(id);

  const updateMutation = useUpdatePatientRequisition();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(patientRequisitionSchema),

    defaultValues: {
      patientName: "",
      hospital: "",
      bloodGroup: "",
      rhType: "",
      age: "",
      gender: "",
      diagnosis: "",
      ipNumber: "",
      referredBy: "",
      wardNumber: "",

      transfusionIndications: {
        Surgery: false,
        Anemia: false,
        Coagulopathy: false,
        Thrombocytopenia: false,
        Dialysis: false,
        Burns: false,
        Newborn: false,
        Others: false,
      },

      previousTransfusion: false,
      previousReaction: false,
      reactionDetails: "",

      bloodComponents: bloodComponents.map((item) => ({
        component: item.value,
        selected: false,
        units: "",
        requiredDateTime: dayjs(),
        reserve: false,
      })),

      isEmergency: false,
      requirementSelection: "",
      physicianName: "",
    },
  });

  useEffect(() => {
    if (!data) return;

    reset({
      patientName: data.patientName,
      hospital: data.hospital,

      bloodGroup: data.bloodGroup.replace("+", "").replace("-", ""),
      rhType: data.bloodGroup.endsWith("+") ? "+" : "-",

      age: data.age,
      gender: data.gender,
      diagnosis: data.diagnosis,
      ipNumber: data.ipNumber,
      referredBy: data.referredBy,
      wardNumber: data.wardNumber,

      previousTransfusion: data.previousTransfusion,
      previousReaction: data.previousReaction,
      reactionDetails: data.reactionDetails || "",

      transfusionIndications: {
        Surgery: data.transfusionIndications?.includes("Surgery"),
        Anemia: data.transfusionIndications?.includes("Anemia"),
        Coagulopathy: data.transfusionIndications?.includes("Coagulopathy"),
        Thrombocytopenia:
          data.transfusionIndications?.includes("Thrombocytopenia"),
        Dialysis: data.transfusionIndications?.includes("Dialysis"),
        Burns: data.transfusionIndications?.includes("Burns"),
        Newborn: data.transfusionIndications?.includes("Newborn"),
        Others: data.transfusionIndications?.includes("Others"),
      },

      bloodComponents: bloodComponents.map((component) => {
        const selected = data.bloodComponents.find(
          (item) =>
            item.component === component.name ||
            item.component === component.value
        );

        return {
          component: component.value,
          selected: !!selected,
          units: selected?.units ?? "",
          requiredDateTime: selected
            ? dayjs(selected.requiredDateTime)
            : dayjs(),
          reserve: selected?.reserve ?? false,
        };
      }),

      isEmergency: data.isEmergency,
      requirementSelection: data.requirementSelection || "",
      physicianName: data.physicianName || "",
    });
  }, [data, reset]);

  const onSubmit = (formData) => {
    // console.log("submitted",formData)
    updateMutation.mutate(
      {
        id,
        formData,
      },
      {
        onSuccess: () => {
          toast.success("Patient Requisition Updated Successfully");
          navigate("/frontdesk/patient-requisition");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Box
        height="70vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography color="error">
        Patient requisition not found.
      </Typography>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Edit Patient Requisition"
        subtitle="Update patient requisition details."
      />

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <PatientDetailsForm control={control} />

        <Box mt={3}>
          <TransfusionIndication control={control} />
        </Box>

        <Box mt={3}>
          <BloodComponentTable control={control} />
        </Box>

        <Box mt={3}>
          <EmergencyDetails control={control} />
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AppButton
            type="submit"
            loading={updateMutation.isPending}
          >
            Update Requisition
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientRequisitionEdit;