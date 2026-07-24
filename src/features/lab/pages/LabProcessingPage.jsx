import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

import PageHeader from "../../../components/common/PageHeader";
import AppCard from "../../../components/common/AppCard";
import EmptyState from "../../../components/common/EmptyState";

import LabStats from "../components/lab-processing/LabStats";
import PatientQueue from "../components/lab-processing/PatientQueue";
import PatientSummaryCard from "../components/lab-processing/PatientSummaryCard";
import LabProcessingCard from "../components/lab-processing/LabProcessingCard";

import {
  getPatients,
  updatePatient,
} from "../../storage/requisitionStorageApi";
import { REQUISITION_STATUS } from "../../../constants/statusConstants";

const LabProcessingPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleLabSubmit = (updatedPatient) => {
  updatePatient(updatedPatient);

  const refreshedPatients = getPatients();

  setPatients(refreshedPatients);

  // If completed, clear the selection
  if (updatedPatient.status === REQUISITION_STATUS.COMPLETED) {
    setSelectedPatient(null);
    return;
  }

  const latestPatient = refreshedPatients.find(
    (patient) => patient.id === updatedPatient.id
  );

  setSelectedPatient(latestPatient);
};
  const queuePatients = patients.filter(
    (patient) => patient.status !== REQUISITION_STATUS.COMPLETED,
  );

  return (
    <>
      <PageHeader
        title="Lab Processing & Cross Match"
        subtitle="Process blood samples and perform compatibility testing"
      />

      <LabStats patients={patients} />

      <Grid container spacing={3}>
        {/* Left Panel */}
        <Grid size={{ xs: 12, md: 4 }}>
          <PatientQueue
            patients={queuePatients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </Grid>

        {/* Right Panel */}
        <Grid size={{ xs: 12, md: 8 }}>
          {selectedPatient ? (
            <Stack spacing={3}>
              <PatientSummaryCard patient={selectedPatient} />

              <LabProcessingCard
                patient={selectedPatient}
                onSubmit={handleLabSubmit}
              />
            </Stack>
          ) : (
            <AppCard sx={{ height: "100%" }}>
              <EmptyState
                icon={
                  <ScienceOutlinedIcon
                    sx={{
                      fontSize: 72,
                      color: "text.disabled",
                    }}
                  />
                }
                title="No Patient Selected"
                subtitle="Select a patient from the queue to begin processing."
              />
            </AppCard>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LabProcessingPage;