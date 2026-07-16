import { Card, CardContent, Stack, Typography } from "@mui/material";

const StatCard = ({
  title,
  value,
  icon,
  iconColor = "primary.main",
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          sx={{justifyContent:"space-between",
          alignItems:"center"}}
        >
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
          </Stack>

          <Stack
            sx={{
              color: iconColor,
            }}
          >
            {icon}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;