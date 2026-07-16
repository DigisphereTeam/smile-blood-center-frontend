import { Button, CircularProgress } from "@mui/material";

const AppButton = ({
  children,
  loading = false,
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  variant = "contained",
  color = "primary",
  type = "button",
  sx = {},
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      sx={sx}
      {...props}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  );
};

export default AppButton;