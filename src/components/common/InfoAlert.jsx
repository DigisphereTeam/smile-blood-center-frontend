import { Alert, AlertTitle } from "@mui/material";

const InfoAlert = ({ title, children }) => {
  return (
    <Alert
      severity="info"
      sx={{
        borderRadius: 2,
      }}
    >
      <AlertTitle>{title}</AlertTitle>

      {children}
    </Alert>
  );
};

export default InfoAlert;