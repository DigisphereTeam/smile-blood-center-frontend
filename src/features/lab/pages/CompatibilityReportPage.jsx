// import { useEffect, useState } from "react";
// import { Stack } from "@mui/material"

// import { getCompatibilityReports } from "../../storage/compatibilityStorageApi";
// import PageHeader from "../../../components/common/PageHeader";
// import CompatibilityStats from "../components/compatibility-report/CompatibilityStats";
// import CompatibilityTable from "../components/compatibility-report/CompatibilityTable";

// const CompatibilityReportPage = () => {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     setReports(getCompatibilityReports());
//   }, []);

//   return (
//     <Stack spacing={3}>
//       <PageHeader
//         title="Compatibility Report"
//         subtitle="View completed compatibility reports generated after successful laboratory processing."
//       />

//       <CompatibilityStats reports={reports} />

//       <CompatibilityTable reports={reports} />
//     </Stack>
//   );
// };

// export default CompatibilityReportPage;


import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

import PageHeader from "../../../components/common/PageHeader";
import CompatibilityStats from "../components/compatibility-report/CompatibilityStats";
import CompatibilityTable from "../components/compatibility-report/CompatibilityTable";

// Static compatibility report data
const staticReports = [
  {
    id: 1,
    reportId: "CR-2026-001",
    unitNumber: "BLD-001",
    bloodGroup: "O+",
    crossMatchResult: "Compatible",
    patientName: "Rahul Sharma",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    reportId: "CR-2026-002",
    unitNumber: "BLD-002",
    bloodGroup: "A+",
    crossMatchResult: "Compatible",
    patientName: "Priya Reddy",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    reportId: "CR-2026-003",
    unitNumber: "BLD-003",
    bloodGroup: "B+",
    crossMatchResult: "Incompatible",
    patientName: "Arjun Varma",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    reportId: "CR-2026-004",
    unitNumber: "BLD-004",
    bloodGroup: "AB+",
    crossMatchResult: "Compatible",
    patientName: "Sneha Patel",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 5,
    reportId: "CR-2026-005",
    unitNumber: "BLD-005",
    bloodGroup: "O-",
    crossMatchResult: "Incompatible",
    patientName: "Vikram Singh",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 6,
    reportId: "CR-2026-006",
    unitNumber: "BLD-006",
    bloodGroup: "A-",
    crossMatchResult: "Compatible",
    patientName: "Ananya Rao",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 7,
    reportId: "CR-2026-007",
    unitNumber: "BLD-007",
    bloodGroup: "B-",
    crossMatchResult: "Compatible",
    patientName: "Kiran Kumar",
    createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
  },
];

const CompatibilityReportPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(staticReports);
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
