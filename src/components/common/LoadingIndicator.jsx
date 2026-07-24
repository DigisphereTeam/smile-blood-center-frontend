import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingIndicator = ({
  message = "Loading...",
  fullScreen = false,
  size = 40,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
        minHeight: fullScreen ? "100vh" : 250,
      }}
    >
      <CircularProgress size={size} />

      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;