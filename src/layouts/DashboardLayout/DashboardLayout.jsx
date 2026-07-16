import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Mobile Drawer */}
      {isMobile && (
        <MobileDrawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
        />
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Header
          isMobile={isMobile}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;