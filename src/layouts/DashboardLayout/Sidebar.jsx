import { Box, Drawer } from "@mui/material";

import AppLogo from "../../components/common/AppLogo";
import Navigation from "./Navigation";

const SIDEBAR_WIDTH = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          borderRadius:0,
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

export default Sidebar;