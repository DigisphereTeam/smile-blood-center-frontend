import Grid from "@mui/material/Grid";
import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const CompatibilityStats = ({
  reports = [],
}) => {
  const today = new Date();

  const reportsToday = reports.filter((report) => {
    if (!report.createdAt) return false;

    const date = new Date(report.createdAt);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() ===
        today.getFullYear()
    );
  }).length;

  const reportsThisMonth = reports.filter((report) => {
    if (!report.createdAt) return false;

    const date = new Date(report.createdAt);

    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() ===
        today.getFullYear()
    );
  }).length;

  const compatibleReports = reports.filter(
    (report) =>
      report.crossMatchResult === "Compatible"
  ).length;

  const compatibilityRate =
    reports.length === 0
      ? 0
      : Math.round(
          (compatibleReports / reports.length) *
            100
        );

  const stats = [
    {
      title: "Reports Today",
      value: reportsToday,
      color: "#C62828",
    },
    {
      title: "Reports This Month",
      value: reportsThisMonth,
      color: "#C62828",
    },
    {
      title: "Compatible Reports",
      value: compatibleReports,
      color: "#2E7D32",
    },
    {
      title: "Compatibility Rate",
      value: `${compatibilityRate}%`,
      color: "#1565C0",
    },
  ];

  return (
    <Grid container spacing={2} mb={3}>
      {stats.map((stat) => (
        <Grid
          key={stat.title}
          size={{ xs: 12, sm: 6, lg: 3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  color: stat.color,
                }}
              >
                {stat.value}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {stat.title}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CompatibilityStats;