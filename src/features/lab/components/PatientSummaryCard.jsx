import {
  Box,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";

import AppCard from "../../../components/common/AppCard";
import StatusChip from "../../../components/common/StatusChip";
import BloodGroupCard from "../../../components/common/BloodGroupCard";

const formatComponent = (component) => {
  if (!component) return "-";

  return component
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Label = ({ children }) => (
  <Typography
    variant="caption"
    sx={{
      color: "text.secondary",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      fontWeight: 500,
    }}
  >
    {children}
  </Typography>
);

const Value = ({ children }) => (
  <Typography
    variant="subtitle2"
    fontWeight={700}
    mt={0.5}
  >
    {children}
  </Typography>
);

const PatientSummaryCard = ({ patient }) => {
  if (!patient) return null;

  const component = patient.bloodComponents?.[0];

  return (
    <AppCard sx={{ p: 3 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {patient.patientName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {patient.requisitionId}
            {patient.submittedDate &&
              ` • Submitted: ${patient.submittedDate}`}
          </Typography>
        </Box>

        {/* Content */}
        <Grid container spacing={4}>
          {/* Blood Group */}
          <Grid
            size={{ xs: 12, md: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Label>PATIENT BLOOD GROUP</Label>

            <Box mt={2}>
              <BloodGroupCard bloodGroup={patient.bloodGroup} size={80} />
            </Box>
          </Grid>

          {/* Right Side */}
          <Grid size={{ xs: 12, md: 10 }}>
            <Stack spacing={4}>
              {/* Row 1 */}
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Label>AGE / GENDER</Label>
                  <Value>
                    {patient.age} / {patient.gender}
                  </Value>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Label>HOSPITAL</Label>
                  <Value>{patient.hospital}</Value>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Label>IP NUMBER</Label>
                  <Value>{patient.ipNumber}</Value>
                </Grid>
              </Grid>

              {/* Row 2 */}
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Label>COMPONENT</Label>
                  <Value>
                    {formatComponent(component?.component)}
                  </Value>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Label>UNITS REQUIRED</Label>
                  <Value>
                    {component?.units ?? 0} Units
                  </Value>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Label>STATUS</Label>

                  <Stack
                    direction="row"
                    spacing={1}
                    mt={1}
                    flexWrap="wrap"
                  >
                    <StatusChip status={patient.status} />

                    {patient.isEmergency && (
                      <Chip
                        label="Emergency"
                        color="error"
                        size="small"
                      />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </AppCard>
  );
};

export default PatientSummaryCard;