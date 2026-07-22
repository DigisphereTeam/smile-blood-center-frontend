import { Box, Drawer, Paper, Typography } from "@mui/material";

import AppLogo from "../../components/common/AppLogo";
import Navigation from "./Navigation";
import useAuth from "../../features/auth/hooks/useAuth";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const SIDEBAR_WIDTH = 240;

const Sidebar = () => {
  const { user } = useAuth();

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
          borderRadius: 0,
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
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: "block" }}
        >
          Current Role
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          <PersonOutlineOutlinedIcon fontSize="small" />

          <Typography fontWeight={600}>
            {user?.role
              ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
              : "Unknown"}
          </Typography>
        </Paper>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
