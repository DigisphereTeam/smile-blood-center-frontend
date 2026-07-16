import { useMemo } from "react";

import { Stack, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import EmptyState from "../../../../components/common/EmptyState";
import SearchField from "../../../../components/common/SearchField";

import BillingPatientCard from "./BillingPatientCard";

const BillingQueue = ({
  patients,
  selectedPatient,
  search,
  onSearchChange,
  onSelectPatient,
}) => {
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      return (
        patient.patientName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.requisitionId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.ipNumber
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [patients, search]);

  return (
    <AppCard
      sx={{
        height: "100%",
        minHeight: 720,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={600}>
          Ready for Billing ({filteredPatients.length})
        </Typography>

        <SearchField
          placeholder="Search by name, ID, IP..."
          value={search}
          onChange={onSearchChange}
        />

        <Stack
          spacing={2}
          sx={{
            flex: 1,
            maxHeight: 600,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <BillingPatientCard
                key={patient.id}
                patient={patient}
                selected={selectedPatient?.id === patient.id}
                onClick={() => onSelectPatient(patient)}
              />
            ))
          ) : (
            <EmptyState
              title="No Patients Ready for Billing"
              description="Patients will appear here after Lab Processing is completed."
            />
          )}
        </Stack>
      </Stack>
    </AppCard>
  );
};

export default BillingQueue;