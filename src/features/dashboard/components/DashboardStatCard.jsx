import { Box, Paper, Typography } from "@mui/material";

const DashboardStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  borderColor = "divider",
  iconBgColor = "#FDECEC",
  iconColor = "#D32F2F",
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 92,
        p: 2,
        border: 1,
        borderColor,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        bgcolor: "background.paper",
      }}
    >
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: 11,
            display: "block",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            lineHeight: 1.2,
            mb: subtitle ? 0.5 : 0,
          }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: "success.main",
              fontSize: 11,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          bgcolor: iconBgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {Icon && (
          <Icon
            sx={{
              color: iconColor,
              fontSize: 20,
            }}
          />
        )}
      </Box>
    </Paper>
  );
};

export default DashboardStatCard;