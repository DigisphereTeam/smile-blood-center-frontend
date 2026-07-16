import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import AppButton from "../../../components/common/AppButton";

import { getPatients } from "../../storage/requisitionStorageApi";
import PatientRequisitionTable from "../components/PatientRequisitionTable";
import { Box } from "@mui/material";

const PatientRequisitionList = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    const data = getPatients();
    setPatients(data);
  };

  const handleCreate = () => {
    navigate("/frontdesk/patient-requisition/create");
  };

  return (
    <>
      <PageHeader
        title="Patient Requisition"
        subtitle="Manage blood component requisitions."
        action={
          <Box sx={{width:"100%",height:"40%", display:"flex", justifyContent:"flex-end"}}>
            <AppButton onClick={handleCreate} sx={{}}>
              Create New Requisition
            </AppButton>
          </Box>
        }
      />

      <PatientRequisitionTable patients={patients} onRefresh={loadPatients} />
    </>
  );
};

export default PatientRequisitionList;
