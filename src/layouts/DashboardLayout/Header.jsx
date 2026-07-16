import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AppButton from "../../components/common/AppButton";
import { useNavigate } from "react-router-dom";

import useAuth from "../../features/auth/hooks/useAuth";

const SIDEBAR_WIDTH = 240;

const Header = ({ isMobile, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        borderRadius: 0,
        width: {
          xs: "100%",
          md: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        },
        ml: {
          xs: 0,
          md: `${SIDEBAR_WIDTH}px`,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <Box display="flex" alignItems="center">
          {isMobile && (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Right Side */}
        <AppButton
          variant="outlined"
          color="primary"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
        >
          Logout
        </AppButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;