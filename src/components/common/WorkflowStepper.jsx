import { Box, Typography } from "@mui/material";

const WorkflowStepper = ({ steps, activeStep }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${steps.length},1fr)`,
        backgroundColor: "grey.100",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {steps.map((step, index) => (
        <Box
          key={step}
          sx={{
            py: 1,
            textAlign: "center",
            bgcolor:
              activeStep === index
                ? "common.white"
                : "transparent",
            borderRadius: 2,
            transition: ".2s",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={
              activeStep === index ? 600 : 500
            }
          >
            {step}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default WorkflowStepper;