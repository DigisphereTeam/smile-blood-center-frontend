import { Box, Typography } from "@mui/material";
import { BLOOD_GROUP_THEME } from "../../constants/bloodLabelTheme";

const BloodGroupCard = ({ bloodGroup, rhType, size = 140 }) => {
  let group;

  if (rhType) {
    group = `${bloodGroup}${rhType === "Positive" ? "+" : "-"}`;
  } else {
    group = bloodGroup;
  }

  const theme = BLOOD_GROUP_THEME[group];


  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 3,
        bgcolor: theme.cardBackground,
        border: "2px solid #263445",
        boxShadow: "0 10px 20px rgba(0,0,0,.18)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: size * 0.42,
          fontWeight: 900,
          color: theme.text,
          lineHeight: 1,
          letterSpacing: -2,
        }}
      >
        {group}
      </Typography>
    </Box>
  );
};

export default BloodGroupCard;
