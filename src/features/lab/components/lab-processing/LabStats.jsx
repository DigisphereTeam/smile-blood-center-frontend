import Grid from "@mui/material/Grid";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import StatCard from "../../../../components/common/StatCard";

import { REQUISITION_STATUS } from "../../../../constants/statusConstants";

const LabStats = ({ patients = [] }) => {
  const totalQueue = patients.filter(
    (patient) => patient.status !== REQUISITION_STATUS.COMPLETED
  ).length;

  const pending = patients.filter(
    (patient) => patient.status === REQUISITION_STATUS.PENDING
  ).length;

  const inProgress = patients.filter(
    (patient) => patient.status === REQUISITION_STATUS.IN_PROGRESS
  ).length;

  const emergency = patients.filter(
    (patient) => patient.isEmergency === true
  ).length;

  return (
    <Grid container spacing={3} sx={{mb:2}}>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Total Queue"
          value={totalQueue}
          icon={<ScienceOutlinedIcon fontSize="large" />}
          iconColor="primary.main"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Pending"
          value={pending}
          icon={<PendingActionsOutlinedIcon fontSize="large" />}
          iconColor="warning.main"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="In Progress"
          value={inProgress}
          icon={<BiotechOutlinedIcon fontSize="large" />}
          iconColor="info.main"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <StatCard
          title="Emergency"
          value={emergency}
          icon={<WarningAmberRoundedIcon fontSize="large" />}
          iconColor="error.main"
        />
      </Grid>
    </Grid>
  );
};

export default LabStats;