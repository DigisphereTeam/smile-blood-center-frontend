import { Stack, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import StatusChip from "../../../../components/common/StatusChip";

const BillingPatientCard = ({
  patient,
  selected = false,
  onClick,
}) => {
  const firstComponent = patient.bloodComponents?.[0];

  return (
    <AppCard
      onClick={onClick}
      sx={{
        width: "100%",
        cursor: "pointer",
        px: 3,
        py: 2.5,
        border: (theme) =>
          selected
            ? `2px solid ${theme.palette.primary.main}`
            : "1px solid",
        borderColor: selected ? "primary.main" : "divider",
        borderRadius: 3,
        transition: "all 0.2s ease",

        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 3,
        },
      }}
    >
      <Stack spacing={2.5}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600}>
              {patient.patientName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {patient.requisitionId}
            </Typography>
          </Stack>

          <Stack spacing={0.75} alignItems="flex-end">
            {patient.isEmergency && (
              <StatusChip status="Emergency" />
            )}

            <StatusChip status="Lab Completed" />
          </Stack>
        </Stack>

        {/* Details */}
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 85 }}
            >
              Hospital
            </Typography>

            <Typography
              variant="body2"
              fontWeight={500}
              textAlign="right"
              sx={{ flex: 1 }}
            >
              {patient.hospital}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 85 }}
            >
              Component
            </Typography>

            <Typography
              variant="body2"
              fontWeight={500}
              textAlign="right"
              sx={{ flex: 1 }}
            >
              {firstComponent?.component ?? "-"} ({firstComponent?.units ?? 0}
              U)
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: 85 }}
            >
              IP Number
            </Typography>

            <Typography
              variant="body2"
              fontWeight={500}
              textAlign="right"
              sx={{ flex: 1 }}
            >
              {patient.ipNumber}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </AppCard>
  );
};

export default BillingPatientCard;