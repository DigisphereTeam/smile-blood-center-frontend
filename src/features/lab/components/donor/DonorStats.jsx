import { Grid, Stack, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";

const DonorStats = ({ donors = [] }) => {
  const totalDonors = donors.length;

  const availableUnits = donors.filter(
    (donor) => donor.status === "AVAILABLE"
  ).length;

  const voluntaryDonations = donors.filter(
    (donor) => donor.donationType === "VOLUNTARY"
  ).length;

  const replacementDonations = donors.filter(
    (donor) => donor.donationType === "REPLACEMENT"
  ).length;

  const stats = [
    {
      title: "Total Donors",
      value: totalDonors,
    },
    {
      title: "Available Units",
      value: availableUnits,
    },
    {
      title: "Voluntary Donations",
      value: voluntaryDonations,
    },
    {
      title: "Replacement Donations",
      value: replacementDonations,
    },
  ];

  return (
    <Grid container spacing={2} sx={{mb:2}}>
      {stats.map((stat) => (
        <Grid
          key={stat.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <AppCard>
            <Stack spacing={1}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {stat.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight={700}
              >
                {stat.value}
              </Typography>
            </Stack>
          </AppCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default DonorStats;