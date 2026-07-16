import { Stack, Typography } from "@mui/material";

const EmptyState = ({
  icon,
  title,
  subtitle,
  height = 450,
}) => {
  return (
    <Stack
      spacing={2}
      sx={{
        height,
        textAlign: "center",
        px: 3,
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      {icon}

      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 420 }}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default EmptyState;