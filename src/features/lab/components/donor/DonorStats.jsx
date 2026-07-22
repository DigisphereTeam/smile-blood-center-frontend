import { Grid, Stack, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";

const DonorStats = ({ donors = [] }) => {
  const totalDonors = donors.length;

  const activeDonors = donors.filter(
    (donor) => donor.is_active
  ).length;

  const voluntaryDonations = donors.filter(
    (donor) => donor.donation_type === "Voluntary"
  ).length;

  const replacementDonations = donors.filter(
    (donor) => donor.donation_type === "Replacement"
  ).length;

  const stats = [
    {
      title: "Total Donors",
      value: totalDonors,
    },
    {
      title: "Active Donors",
      value: activeDonors,
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
    <Grid container spacing={2} mb={2}>
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
                color="primary.main"
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