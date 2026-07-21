import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";

import PatientDetailsForm from "../components/patient-requisition/PatientDetailsForm";
import TransfusionIndication from "../components/patient-requisition/TransfusionIndication";
import BloodComponentTable from "../components/patient-requisition/BloodComponentTable";
import EmergencyDetails from "../components/patient-requisition/EmergencyDetails";

import { patientRequisitionSchema } from "../schemas/patientRequisition.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { bloodComponents } from "../../../constants/frontdeskMockData";
import dayjs from "dayjs";

import { usePatientRequisition } from "../hooks/usePatientRequisition";

const PatientRequisitionView = () => {
  const { id } = useParams();

  const { data, isLoading } = usePatientRequisition(id);

  const { control, reset } = useForm({
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
        const selectedComponent = data.bloodComponents.find(
          (item) =>
            item.component.toLowerCase().includes(component.name.toLowerCase()) ||
            item.component === component.value
        );

        return {
          component: component.value,
          selected: !!selectedComponent,
          units: selectedComponent?.units ?? "",
          requiredDateTime: selectedComponent
            ? dayjs(selectedComponent.requiredDateTime)
            : dayjs(),
          reserve: selectedComponent?.reserve ?? false,
        };
      }),

      isEmergency: data.isEmergency,
      requirementSelection: data.requirementSelection || "",
      physicianName: data.physicianName || "",
    });
  }, [data, reset]);

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
        title="Patient Requisition Details"
        subtitle="View patient requisition information."
      />

      <PatientDetailsForm control={control} disabled />

      <Box mt={3}>
        <TransfusionIndication control={control} disabled />
      </Box>

      <Box mt={3}>
        <BloodComponentTable control={control} disabled />
      </Box>

      <Box mt={3}>
        <EmergencyDetails control={control} disabled />
      </Box>
    </Box>
  );
};

export default PatientRequisitionView;