import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import RHFTextField from "../../../components/common/RHFTextField";
import AppButton from "../../../components/common/AppButton";

import {
  registerDefaultValues,
  registerSchema,
} from "../schemas/registerSchema";

import useRegister from "../hooks/useRegister";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = (formData) => {
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      role: formData.role,
    };

    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response.message);

        navigate("/login");
      },

      onError: (error) => {
        toast.error(error.response?.data?.message || "Registration failed.");
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField
            control={control}
            name="first_name"
            label="First Name"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <RHFTextField control={control} name="last_name" label="Last Name" />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RHFTextField
            control={control}
            name="email"
            label="Email Address"
            type="email"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RHFTextField
            control={control}
            name="phone_number"
            label="Phone Number"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RHFTextField
            control={control}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RHFTextField
            control={control}
            name="confirm_password"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <RHFTextField control={control} name="role" label="Role" select>
            <MenuItem value="frontdesk">Front Desk</MenuItem>

            <MenuItem value="technical">Technical</MenuItem>
          </RHFTextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <AppButton
            type="submit"
            loading={isPending}
            fullWidth
            sx={{
              py: 1.5,
              fontSize: 16,
            }}
          >
            Create Account
          </AppButton>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={0.5} justifyContent="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>

            <Link
              component="button"
              underline="hover"
              fontWeight={600}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
