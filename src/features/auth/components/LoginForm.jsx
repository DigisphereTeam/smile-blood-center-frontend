import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Link,
  Stack,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RHFTextField from "../../../components/common/RHFTextField";
import AppButton from "../../../components/common/AppButton";

import { loginDefaultValues, loginSchema } from "../schemas/loginSchema";

import useLogin from "../hooks/useLogin";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../constants/roles";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { mutate, isPending } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = (formData) => {
    mutate(formData, {
      onSuccess: (response) => {
        const { token, user } = response.data;

        login({ token, user });

        toast.success(response.message);

        switch (user.role) {
          case ROLES.ADMIN:
            navigate("/dashboard");
            break;

          case ROLES.FRONTDESK:
            navigate("/patient-requisition");
            break;

          case ROLES.TECHNICAL:
            navigate("/donor-registration");
            break;

          default:
            navigate("/unauthorized");
        }
      },

      onError: (error) => {
        toast.error(error.response?.data?.message || "Login failed.");
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <RHFTextField
        control={control}
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            fullWidth
            error={!!error}
            helperText={error?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            /* ADD THIS STYLING OVERRIDE 👇 */
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#e8f0fe", // Forces the container (including icon area) to match autofill blue
              },
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px #e8f0fe inset !important", // Keeps the input background seamless
              },
            }}
          />
        )}
      />

      <Box display="flex" justifyContent="flex-end" mt={-1}>
        <Link
          component="button"
          underline="hover"
          fontSize={14}
          fontWeight={500}
        >
          Forgot Password?
        </Link>
      </Box>

      <AppButton
        type="submit"
        loading={isPending}
        fullWidth
        sx={{
          py: 1.5,
          fontSize: 16,
          mt: 1,
        }}
      >
        Sign In
      </AppButton>

      <Stack direction="row" spacing={0.5} justifyContent="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?
        </Typography>

        <Link
          component="button"
          underline="hover"
          fontWeight={600}
          fontSize={14}
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginForm;
