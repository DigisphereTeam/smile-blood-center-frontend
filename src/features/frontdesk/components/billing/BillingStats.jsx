import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { Grid } from "@mui/material";

import StatCard from "../../../../components/common/StatCard";

import { getBillingStats } from "../../../storage/requisitionStorageApi";

const BillingStats = () => {
  const stats = getBillingStats();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <StatCard
          title="Lab Completed"
          value={stats.labCompleted}
          icon={<ReceiptLongOutlinedIcon fontSize="large" />}
          iconColor="success.main"
          valueColor="success.main"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <StatCard
          title="Pending Billing"
          value={stats.pendingBilling}
          icon={<PendingActionsOutlinedIcon fontSize="large" />}
          iconColor="warning.main"
          valueColor="warning.main"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <StatCard
          title="Today's Revenue"
          value={`₹ ${stats.todayRevenue.toLocaleString("en-IN")}`}
          icon={<CurrencyRupeeOutlinedIcon fontSize="large" />}
          iconColor="primary.main"
          valueColor="primary.main"
        />
      </Grid>
    </Grid>
  );
};

export default BillingStats;