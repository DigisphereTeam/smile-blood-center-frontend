import { Chip, Stack, Typography } from "@mui/material";

const BloodGroupChip = ({ bloodGroup, isEmergency = false }) => {
  return (
    <Stack direction="row" spacing={1} sx={{alignItems:"center"}}>
      <Typography fontWeight={600}>
        {bloodGroup}
      </Typography>

      {isEmergency && (
        <Chip
          label="Emergency"
          color="error"
          size="small"
        />
      )}
    </Stack>
  );
};

export default BloodGroupChip;