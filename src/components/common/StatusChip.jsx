import { Chip } from "@mui/material";

const STATUS_CONFIG = {
  Pending: {
    color: "warning",
    label: "Pending",
  },
  "In Progress": {
    color: "info",
    label: "In Progress",
  },
  Completed: {
    color: "success",
    label: "Completed",
  },
  "Lab Completed": {
    color: "success",
    label: "Lab Completed",
  },
  Cancelled: {
    color: "error",
    label: "Cancelled",
  },
  Billed: {
    color: "primary",
    label: "Billed",
  },
  Paid: {
    color: "success",
    label: "Paid",
  },
  Compatible: {
    color: "success",
    label: "Compatible",
  },
  Incompatible: {
    color: "error",
    label: "Incompatible",
  },
  Emergency: {
    color: "error",
    label: "Emergency",
  },
};

const StatusChip = ({ status, size = "small", variant = "filled", sx = {} }) => {
  const config = STATUS_CONFIG[status] || {
    color: "default",
    label: status,
  };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size={size}
      variant={variant}
      sx={sx}
    />
  );
};

export default StatusChip;