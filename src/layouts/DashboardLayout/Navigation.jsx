import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import useAuth from "../../features/auth/hooks/useAuth";
import { ROLES } from "../../features/auth/constants/roles";

const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardOutlinedIcon,
    roles: [ROLES.ADMIN],
  },
  {
    title: "Patient Requisition",
    path: "/frontdesk/patient-requisition",
    icon: DescriptionOutlinedIcon,
    roles: [ROLES.FRONTDESK, ROLES.ADMIN],
  },
  {
    title: "Donor Registration",
    path: "/donor-registration",
    icon: BloodtypeIcon,
    roles: [ROLES.TECHNICAL, ROLES.ADMIN],
  },
  {
    title: "Lab Processing",
    path: "/lab-processing",
    icon: BiotechOutlinedIcon,
    roles: [ROLES.TECHNICAL, ROLES.ADMIN],
  },
  // {
  //   title: "Label Generation",
  //   path: "/label-generation",
  //   icon: LocalOfferOutlinedIcon,
  //   roles: [ROLES.TECHNICAL, ROLES.ADMIN],
  // },
  {
    title: "Compatibility Report",
    path: "/compatibility-report",
    icon: AssignmentOutlinedIcon,
    roles: [ROLES.TECHNICAL, ROLES.ADMIN],
  },
  {
    title: "Billing & Receipt",
    path: "/billing",
    icon: ReceiptLongOutlinedIcon,
    roles: [ROLES.FRONTDESK, ROLES.ADMIN],
  },
];

const Navigation = () => {
  const { user } = useAuth();

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <List sx={{ mt: 1 }}>
      {filteredNavigation.map((item) => {
        const Icon = item.icon;

        return (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === "/dashboard"}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 1,
              color: "text.primary",

              "&.active": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: 600,

                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
              },

              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.contrastText",

                "& .MuiListItemIcon-root": {
                  color: "primary.contrastText",
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: "inherit",
              }}
            >
              <Icon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default Navigation;