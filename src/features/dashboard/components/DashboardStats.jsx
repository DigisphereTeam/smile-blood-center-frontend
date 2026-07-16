import Grid from "@mui/material/Grid";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import DashboardStatCard from "./DashboardStatCard";

const stats = [
  {
    id: 1,
    title: "No of Patient",
    value: 737,
    subtitle: "+12% from last month",
    icon: Inventory2OutlinedIcon,
    borderColor: "grey.300",
    iconBgColor: "#FDECEC",
    iconColor: "#D32F2F",
  },
  {
    id: 2,
    title: "Completed",
    value: 23,
    subtitle: "",
    icon: WarningAmberOutlinedIcon,
    borderColor: "#FFD8A8",
    iconBgColor: "#FFF4E5",
    iconColor: "#ED6C02",
  },
  {
    id: 3,
    title: "Pending Requests",
    value: 8,
    subtitle: "",
    icon: AccessTimeOutlinedIcon,
    borderColor: "#BFDBFE",
    iconBgColor: "#E8F4FD",
    iconColor: "#1976D2",
  },
  {
    id: 4,
    title: "Today's Collections",
    value: 42,
    subtitle: "+5 from yesterday",
    icon: LocalFireDepartmentOutlinedIcon,
    borderColor: "grey.300",
    iconBgColor: "#FDECEC",
    iconColor: "#D32F2F",
  },
  {
    id: 5,
    title: "Emergency Requests",
    value: 3,
    subtitle: "",
    icon: ErrorOutlineOutlinedIcon,
    borderColor: "#FECACA",
    iconBgColor: "#FDECEC",
    iconColor: "#D32F2F",
  },
];

const DashboardStats = () => {
  return (
    <Grid container spacing={2}>
      {stats.map((stat) => (
        <Grid
          key={stat.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 2.4,
          }}
        >
          <DashboardStatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;