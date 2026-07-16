import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";

import LoginForm from "../components/LoginForm";
import Logo from "../../../assets/images/logo.png";

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "background.default",
      }}
    >
      {/* ================= Left Section ================= */}
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
              md: 180,
              lg: 220,
            },
            mb: 5,
          }}
        />

        <Typography
          variant="h2"
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
            opacity: 0.9,
            maxWidth: 420,
            lineHeight: 1.7,
          }}
        >
          Secure Blood Bank Management System for
          Registration, Laboratory Processing,
          Billing and Blood Inventory.
        </Typography>
      </Box>

      {/* ================= Right Section ================= */}
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          px: {
            xs: 3,
            sm: 6,
            md: 8,
            lg: 10,
          },

          py: {
            xs: 5,
            md: 8,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 460,
          }}
        >
          <Typography
            fontWeight={700}
            sx={{
              mb: 1,
              fontSize: {
                xs: "2rem",
                sm: "2.3rem",
                md: "2.5rem",
              },
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 5,
              fontSize: {
                xs: "0.95rem",
                md: "1rem",
              },
            }}
          >
            Sign in to continue to your account.
          </Typography>

          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;