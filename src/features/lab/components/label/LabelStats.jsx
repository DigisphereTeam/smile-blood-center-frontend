import { Card, CardContent, Grid, Typography } from "@mui/material";
import { labelStats } from "../../../../constants/labelGenerationMockData";

const stats = [
  {
    title: "Labels Printed Today",
    value: labelStats.printedToday,
    color: "#C62828",
  },
  {
    title: "Labels This Month",
    value: labelStats.printedThisMonth,
    color: "#C62828",
  },
  {
    title: "Print Success Rate",
    value: labelStats.successRate,
    color: "#00A63E",
  },
  {
    title: "Pending Labels",
    value: labelStats.pendingLabels,
    color: "#2962FF",
  },
];

const LabelStats = () => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {stats.map((item) => (
        <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={700}
                // color={item.color}
                sx={{
                  color: item.color,
                }}
              >
                {item.value}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {item.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LabelStats;
