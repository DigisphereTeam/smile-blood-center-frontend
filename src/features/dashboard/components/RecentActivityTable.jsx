import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const rows = [
  {
    id: "REQ-2024-1245",
    patientName: "John Doe",
    component: "PRBC",
    status: "Issued",
    issueTime: "10:45 AM",
  },
  {
    id: "REQ-2024-1246",
    patientName: "Jane Smith",
    component: "FFP",
    status: "Pending",
    issueTime: "11:20 AM",
  },
  {
    id: "REQ-2024-1247",
    patientName: "Robert Johnson",
    component: "Platelets",
    status: "Compatible",
    issueTime: "11:45 AM",
  },
  {
    id: "REQ-2024-1248",
    patientName: "Emily Davis",
    component: "Whole Blood",
    status: "Pending",
    issueTime: "12:10 PM",
  },
  {
    id: "REQ-2024-1249",
    patientName: "Michael Wilson",
    component: "Cryoprecipitate",
    status: "Compatible",
    issueTime: "12:30 PM",
  },
];

const getStatusChip = (status) => {
  switch (status) {
    case "Issued":
      return (
        <Chip
          label="Issued"
          size="small"
          sx={{
            bgcolor: "#FDECEC",
            color: "#D32F2F",
            fontSize: 11,
            height: 22,
            fontWeight: 500,
          }}
        />
      );

    case "Pending":
      return (
        <Chip
          label="Pending"
          size="small"
          sx={{
            bgcolor: "#FFF4E5",
            color: "#ED6C02",
            fontSize: 11,
            height: 22,
            fontWeight: 500,
          }}
        />
      );

    case "Compatible":
      return (
        <Chip
          label="Compatible"
          size="small"
          sx={{
            bgcolor: "#E8F5E9",
            color: "#2E7D32",
            fontSize: 11,
            height: 22,
            fontWeight: 500,
          }}
        />
      );

    default:
      return <Chip label={status} size="small" />;
  }
};

const RecentActivityTable = () => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        mt: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          px: 2,
          py: 2,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Recent Activity
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Request ID</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Patient Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Issue Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.patientName}</TableCell>
              <TableCell>{row.component}</TableCell>
              <TableCell>{getStatusChip(row.status)}</TableCell>
              <TableCell>{row.issueTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentActivityTable;