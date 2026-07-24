import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/images/logo.png";

const AuthLeftSection = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        width: "50%",
        bgcolor: "primary.main",
        color: "common.white",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 8,
        py: 6,
        background:
          "linear-gradient(135deg,#C62828 0%,#B71C1C 100%)",
      }}
    >
      <Box
        component="img"
        src={Logo}
        alt="Blood Centre"
        sx={{
          width: {
            md: 220,
            lg: 300,
          },
          mb: 5,
        }}
      />

      <Typography
        fontWeight={700}
        sx={{
          mb: 2,
          fontSize: {
            md: "2rem",
            lg: "2.5rem",
          },
        }}
      >
        Blood Centre
      </Typography>

      <Typography
        sx={{
          fontSize: {
            md: "1.1rem",
            lg: "1.3rem",
          },
          maxWidth: 430,
          lineHeight: 1.8,
          opacity: 0.9,
        }}
      >
        Secure Blood Bank Management System for
        Registration, Laboratory Processing,
        Billing and Blood Inventory.
      </Typography>
    </Box>
  );
};

export default AuthLeftSection;