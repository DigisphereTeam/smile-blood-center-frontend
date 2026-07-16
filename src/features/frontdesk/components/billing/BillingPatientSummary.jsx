import { Chip, Grid, Stack, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import EmptyState from "../../../../components/common/EmptyState";
import StatusChip from "../../../../components/common/StatusChip";

const BillingPatientSummary = ({ patient }) => {
  if (!patient) {
    return (
      <AppCard sx={{ minHeight: 220 }}>
        <EmptyState
          title="No Patient Selected"
          description="Select a patient from the billing queue to view details."
        />
      </AppCard>
    );
  }

  const firstComponent = patient.bloodComponents?.[0];

  return (
    <AppCard>
      <Stack spacing={3}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={600}>
              {patient.patientName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {patient.requisitionId}
            </Typography>
          </Stack>

          <StatusChip status="Lab Completed" />
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Hospital
                </Typography>

                <Typography fontWeight={500}>
                  {patient.hospital}
                </Typography>
              </Stack>

              <Stack spacing={0.5}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Blood Component
                </Typography>

                <Typography fontWeight={500}>
                  {firstComponent?.component ?? "-"}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  IP Number
                </Typography>

                <Typography fontWeight={500}>
                  {patient.ipNumber}
                </Typography>
              </Stack>

              <Stack spacing={0.5}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Units Required
                </Typography>

                <Typography fontWeight={500}>
                  {firstComponent?.units ?? 0}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Stack spacing={1}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Blood Bag Numbers
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={
                patient.lab?.donorDetails?.unitNo || "Not Assigned"
              }
              color="error"
              variant="outlined"
            />
          </Stack>
        </Stack>
      </Stack>
    </AppCard>
  );
};

export default BillingPatientSummary;