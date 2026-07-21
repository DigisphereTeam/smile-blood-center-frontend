import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";

import PageHeader from "../../../components/common/PageHeader";
import AppButton from "../../../components/common/AppButton";
import PatientRequisitionTable from "../components/patient-requisition/PatientRequisitionTable";

import { getPatientRequisitions } from "../api/patientRequisitionApi";

const PatientRequisitionList = () => {
  const navigate = useNavigate();

  const {
    data: patients = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["patient-requisitions"],
    queryFn: getPatientRequisitions,
  });

  const handleCreate = () => {
    navigate("/frontdesk/patient-requisition/create");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <>
      <PageHeader
        title="Patient Requisition"
        subtitle="Manage blood component requisitions."
        action={
          <Box
            sx={{
              width: "100%",
              height: "40%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AppButton onClick={handleCreate}>
              Create New Requisition
            </AppButton>
          </Box>
        }
      />

      <PatientRequisitionTable patients={patients} />
    </>
  );
};

export default PatientRequisitionList;