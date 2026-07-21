import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import StatusChip from "../../../../components/common/StatusChip";
import ActionButtons from "./ActionButtons";
import BloodGroupChip from "./BloodGroupChip";

const PatientRequisitionTable = ({ patients }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/frontdesk/patient-requisition/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/frontdesk/patient-requisition/edit/${id}`);
  };

  if (!patients.length) {
    return (
      <AppCard>
        <Typography align="center" color="text.secondary" py={5}>
          No patient requisitions found.
        </Typography>
      </AppCard>
    );
  }

  const columns = [
    "Req. No",
    "Patient Name",
    "Hospital",
    "Blood Group",
    "Status",
    "Requested Date",
    "Actions",
  ];

  return (
    <AppCard>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "grey.100",
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    fontWeight: 600,
                  }}
                  align={column === "Actions" ? "center" : "left"}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} hover>
                <TableCell>{patient.requisitionId}</TableCell>

                <TableCell>{patient.patientName}</TableCell>

                <TableCell>{patient.hospital}</TableCell>

                <TableCell>
                  <BloodGroupChip
                    bloodGroup={`${patient.bloodGroup}${patient.rhType}`}
                    isEmergency={patient.isEmergency}
                  />
                </TableCell>

                <TableCell>
                  <StatusChip status={patient.status} />
                </TableCell>

                <TableCell>
                  {dayjs(patient.createdAt).format("DD MMM YYYY")}
                </TableCell>

                <TableCell align="center" width={150}>
                  <ActionButtons
                    onView={() => handleView(patient.id)}
                    onEdit={() => handleEdit(patient.id)}
                    showEdit={patient.status === "Pending"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AppCard>
  );
};

export default PatientRequisitionTable;
