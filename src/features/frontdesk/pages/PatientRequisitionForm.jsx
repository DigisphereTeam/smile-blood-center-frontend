import { Box } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";
import PatientDetailsForm from "../components/PatientDetailsForm";
import TransfusionIndication from "../components/TransfusionIndication";
import BloodComponentTable from "../components/BloodComponentTable";
import EmergencyDetails from "../components/EmergencyDetails";
import AppButton from "../../../components/common/AppButton";
import { patientRequisitionSchema } from "../schemas/patientRequisition.schema";
import { bloodComponents } from "../../../constants/frontdeskMockData";

import { savePatient } from "../../storage/requisitionStorageApi";

const PatientRequisitionForm = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(patientRequisitionSchema),

    defaultValues: {
      patientName: "",
      hospital: "",
      bloodGroup: "",
      age: "",
      diagnosis: "",
      rhType: "",
      gender: "",
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
      physicianSignature: "",
    },
  });

 const onSubmit = (data) => {
  savePatient(data);

  toast.success("Patient Requisition Created Successfully");

  navigate("/frontdesk/patient-requisition");
};

  return (
    <Box>
      <PageHeader
        title="Patient Requisition Form"
        subtitle="Create a new blood requisition request."
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
          <AppButton type="submit" size="large">
            Submit Requisition
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientRequisitionForm;
