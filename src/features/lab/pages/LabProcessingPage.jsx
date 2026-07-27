import { useState } from "react";
import { Grid, Stack } from "@mui/material";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

import PageHeader from "../../../components/common/PageHeader";
import AppCard from "../../../components/common/AppCard";
import EmptyState from "../../../components/common/EmptyState";

import LabStats from "../components/lab-processing/LabStats";
import PatientQueue from "../components/lab-processing/PatientQueue";
import PatientSummaryCard from "../components/lab-processing/PatientSummaryCard";
import LabProcessingCard from "../components/lab-processing/LabProcessingCard";

import { REQUISITION_STATUS } from "../../../constants/statusConstants";
import { usePatientRequisitions } from "../../frontdesk/hooks/usePatientRequisitions";
import LoadingIndicator from "../../../components/common/LoadingIndicator";

const LabProcessingPage = () => {
  const { data: patients = [], isLoading } = usePatientRequisitions();
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleLabSubmit = (updatedPatient) => {
  setSelectedPatient(updatedPatient);
};

  const queuePatients = patients.filter(
    (patient) => patient.status !== REQUISITION_STATUS.COMPLETED,
  );

  if (isLoading) {
  return <div><LoadingIndicator/></div>;
}

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