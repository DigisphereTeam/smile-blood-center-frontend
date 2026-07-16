import { Box, Drawer } from "@mui/material";

import AppLogo from "../../components/common/AppLogo";
import Navigation from "./Navigation";

const SIDEBAR_WIDTH = 240;

const MobileDrawer = ({ open, onClose }) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: {
          xs: "block",
          md: "none",
        },
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Logo */}
      <AppLogo />

      {/* Navigation */}
      <Box
        sx={{
          flexGrow: 1,
          px: 1,
          pt: 1,
        }}
      >
        <Navigation />
      </Box>

      {/* Bottom Area */}
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >
        Bottom Area
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;