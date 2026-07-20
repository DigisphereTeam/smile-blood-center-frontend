import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

// import PageHeader from "../../../components/common/PageHeader";

// import CompatibilityStats from "../components/CompatibilityStats";
// import CompatibilityTable from "../components/CompatibilityTable";

import { getCompatibilityReports } from "../../storage/compatibilityStorageApi";
import PageHeader from "../../../components/common/PageHeader";
import CompatibilityStats from "../components/compatibility-report/CompatibilityStats";
import CompatibilityTable from "../components/compatibility-report/CompatibilityTable";

const CompatibilityReportPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(getCompatibilityReports());
  }, []);

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Compatibility Report"
        subtitle="View completed compatibility reports generated after successful laboratory processing."
      />

      <CompatibilityStats reports={reports} />

      <CompatibilityTable reports={reports} />
    </Stack>
  );
};

export default CompatibilityReportPage;