import { useMemo, useState } from "react";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";

import AppCard from "../../../components/common/AppCard";
import SearchField from "../../../components/common/SearchField";

import PatientQueueCard from "./PatientQueueCard";

const PatientQueue = ({ patients = [], selectedPatient, onSelectPatient }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        patient.patientName?.toLowerCase().includes(searchText) ||
        patient.requisitionId?.toLowerCase().includes(searchText) ||
        patient.ipNumber?.toLowerCase().includes(searchText);

      const matchesStatus = status === "All" || patient.status === status;

      const matchesPriority =
        priority === "All" ||
        (priority === "Emergency" && patient.isEmergency) ||
        (priority === "Normal" && !patient.isEmergency);

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [patients, search, status, priority]);

  return (
    <AppCard
      sx={{
        height: "100%",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Patient Queue ({filteredPatients.length})
      </Typography>

      <SearchField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search patient, requisition or IP..."
      />

      <Stack direction="row" spacing={2} sx={{mt : 3}}>
        <TextField
          select
          fullWidth
          size="small"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="All">All Status</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          size="small"
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="All">All Priority</MenuItem>
          <MenuItem value="Emergency">Emergency</MenuItem>
          <MenuItem value="Normal">Normal</MenuItem>
        </TextField>
      </Stack>

      <Box
        sx={{
          flex: 1,
          mt: 2,
          overflowY: "auto",
          overflowX: "hidden",
          pr: 0.5,

          display: "flex",
          flexDirection: "column",
          gap: 1.5,

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#d0d5dd",
            borderRadius: 10,
          },

          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <PatientQueueCard
              key={patient.id}
              patient={patient}
              selected={selectedPatient?.id === patient.id}
              onClick={() => onSelectPatient(patient)}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ py: 5 }}
          >
            No requisitions found.
          </Typography>
        )}
      </Box>
    </AppCard>
  );
};

export default PatientQueue;
