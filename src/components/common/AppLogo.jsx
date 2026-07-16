import { Box } from "@mui/material";
import Logo from "../../assets/images/logo.png"

const AppLogo = () => {
  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Box
        component="img"
        src={Logo}
        sx={{
          height:"40px",
          width:'auto',
          objectFit:'contain'
        }}
      />
    </Box>
  );
};

export default AppLogo;