import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import StatusChip from "../../../../components/common/StatusChip";

const formatComponent = (component) => {
  if (!component) return "-";

  return component
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const PatientQueueCard = ({
  patient,
  selected,
  onClick,
}) => {
  const firstComponent = patient.bloodComponents?.[0];

  return (
    <AppCard
      onClick={onClick}
      sx={{
        cursor: "pointer",
        p: 1.5,
        border: 1,
        borderColor: selected
          ? "primary.main"
          : patient.isEmergency
          ? "error.main"
          : "divider",
        transition: "0.2s",

        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 2,
        },
      }}
    >
      <Stack spacing={1}>
        {/* Header */}
        <Stack
          direction="row"
          sx={{justifyContent:"space-between",
          alignItems:"flex-start"}}
        >
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
            >
              {patient.patientName}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {patient.requisitionId}
            </Typography>
          </Box>

          <Stack
            spacing={0.5}
            sx={{alignItems:"flex-end"}}
          >
            {patient.isEmergency && (
              <Chip
                label="Emergency"
                color="error"
                size="small"
              />
            )}

            <StatusChip status={patient.status} />
          </Stack>
        </Stack>

        {/* Details */}
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            sx={{justifyContent:"space-between"}}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Blood Group:
            </Typography>

            <Typography
              variant="caption"
              fontWeight={700}
              color="error.main"
            >
              {patient.bloodGroup}
              {patient.rhType === "Positive"
                ? "+"
                : "-"}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{justifyContent:"space-between"}}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Component:
            </Typography>

            <Typography
              variant="caption"
              fontWeight={600}
            >
              {formatComponent(
                firstComponent?.component
              )}{" "}
              ({firstComponent?.units ?? 0}U)
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{justifyContent:"space-between"}}
          >
            <Typography
              variant="caption"
              color="text.secondary"
            >
              IP:
            </Typography>

            <Typography
              variant="caption"
              fontWeight={600}
            >
              {patient.ipNumber}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </AppCard>
  );
};

export default PatientQueueCard;