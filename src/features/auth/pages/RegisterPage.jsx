import { Box, Typography } from "@mui/material";

import AuthLeftSection from "../components/AuthLeftSection";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "background.default",
      }}
    >
      <AuthLeftSection />

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
            maxWidth: 520,
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
            Create Account
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mb: 5,
            }}
          >
            Register to access the Blood Centre Management
            System.
          </Typography>

          <RegisterForm />
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;