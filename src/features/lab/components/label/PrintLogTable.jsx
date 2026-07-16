import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { printLogs } from "../../../../constants/labelGenerationMockData";

const PrintLogTable = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Print Log History
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Print ID</TableCell>
              <TableCell>Unit Number</TableCell>
              <TableCell>Printed At</TableCell>
              <TableCell>Printed By</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {printLogs.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>

                <TableCell>{row.unitNumber}</TableCell>

                <TableCell>{row.printedAt}</TableCell>

                <TableCell>{row.printedBy}</TableCell>

                <TableCell>{row.patientName}</TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    color="success"
                    sx={{
                      fontWeight: 600,
                      minWidth: 85,
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="error"
                    size="small"
                  >
                    <VisibilityOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          mt: 2,
          p: 1.5,
          bgcolor: "#EAF4FF",
          border: "1px solid #B8DAFF",
          borderRadius: 1,
        }}
      >
        <Typography
          variant="caption"
          color="primary"
        >
          <strong>Note:</strong> All label printing activities are logged for
          audit purposes. Labels must be verified before attachment to blood
          components.
        </Typography>
      </Box>
    </Paper>
  );
};

export default PrintLogTable;