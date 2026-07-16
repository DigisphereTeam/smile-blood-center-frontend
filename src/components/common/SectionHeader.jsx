import { Typography } from "@mui/material";

const SectionHeader = ({ title, sx = {} }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        mb: 3,
        fontWeight: 600,
        ...sx,
      }}
    >
      {title}
    </Typography>
  );
};

export default SectionHeader;