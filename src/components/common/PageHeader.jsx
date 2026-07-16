import { Box, Stack, Typography } from "@mui/material";

const PageHeader = ({
  title,
  subtitle,
  action,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        ...sx,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{justifyContent:"space-between",
        alignItems:"center"}}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {action}
      </Stack>
    </Box>
  );
};

export default PageHeader;