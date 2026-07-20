import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AppCard from "../../../../components/common/AppCard";
import StatusChip from "../../../../components/common/StatusChip";

//

const CompatibilityTable = ({ reports = [] }) => {
  const navigate = useNavigate();

  return (
    <AppCard>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          Compatibility Report History
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Unit Number</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Crossmatch</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <TableRow hover key={report.id}>
                    <TableCell>{report.reportId}</TableCell>

                    <TableCell>{report.unitNumber}</TableCell>

                    <TableCell>{report.bloodGroup}</TableCell>

                    <TableCell>
                      <StatusChip
  status={
    report.crossMatchResult?.toLowerCase() === "compatible"
      ? "Compatible"
      : "Incompatible"
  }
/>
                    </TableCell>

                    <TableCell>{report.patientName}</TableCell>

                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                          navigate(`/compatibility-report/${report.id}`)
                        }
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Box py={4}>
                      <Typography color="text.secondary">
                        No compatibility reports found.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Alert severity="info">
          All compatibility reports are automatically generated after successful
          completion of Blood Grouping, Donor Details and Cross Matching.
          Reports are maintained for audit purposes.
        </Alert>
      </Stack>
    </AppCard>
  );
};

export default CompatibilityTable;
