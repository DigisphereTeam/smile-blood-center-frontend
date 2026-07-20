import { useMemo, useState } from "react";

import {
  Box,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import AppCard from "../../../../components/common/AppCard";
import SearchField from "../../../../components/common/SearchField";
import BloodLabelDialog from "./BloodLabelDialog";

const bloodGroups = ["A", "B", "AB", "O"];

const statusOptions = [
  "AVAILABLE",
  "RESERVED",
  "ISSUED",
  "EXPIRED",
];

const DonorTable = ({ donors = [] }) => {
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");
  const [status, setStatus] = useState("All");

  const [selectedDonor, setSelectedDonor] = useState(null);
  const [openLabel, setOpenLabel] = useState(false);

  const handleView = (donor) => {
    setSelectedDonor(donor);
    setOpenLabel(true);
  };

  const handleClose = () => {
    setOpenLabel(false);
    setSelectedDonor(null);
  };

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        donor.donorName?.toLowerCase().includes(searchText) ||
        donor.donorId?.toLowerCase().includes(searchText) ||
        donor.unitNumber?.toLowerCase().includes(searchText);

      const matchesBloodGroup =
        bloodGroup === "All" || donor.bloodGroup === bloodGroup;

      const matchesStatus =
        status === "All" || donor.status === status;

      return (
        matchesSearch &&
        matchesBloodGroup &&
        matchesStatus
      );
    });
  }, [donors, search, bloodGroup, status]);

  return (
    <>
      <AppCard>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>
            Donor List ({filteredDonors.length})
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={2}
          >
            <SearchField
              placeholder="Search donor, donor ID or unit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <TextField
              select
              size="small"
              label="Blood Group"
              value={bloodGroup}
              onChange={(e) =>
                setBloodGroup(e.target.value)
              }
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="All">
                All Groups
              </MenuItem>

              {bloodGroups.map((group) => (
                <MenuItem
                  key={group}
                  value={group}
                >
                  {group}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="All">
                All Status
              </MenuItem>

              {statusOptions.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Donor ID</TableCell>
                  <TableCell>Unit Number</TableCell>
                  <TableCell>Donor Name</TableCell>
                  <TableCell>ABO Group</TableCell>
                  <TableCell>Rh Type</TableCell>
                  <TableCell>Component</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((donor) => (
                    <TableRow
                      hover
                      key={donor.donorId}
                    >
                      <TableCell>
                        {donor.donorId}
                      </TableCell>

                      <TableCell>
                        {donor.unitNumber}
                      </TableCell>

                      <TableCell>
                        {donor.donorName}
                      </TableCell>

                      <TableCell>
                        {donor.bloodGroup}
                      </TableCell>

                      <TableCell>
                        {donor.rhType === "Positive"
                          ? "+"
                          : "-"}
                      </TableCell>

                      <TableCell>
                        {donor.component}
                      </TableCell>

                      <TableCell>
                        {donor.status}
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            handleView(donor)
                          }
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                    >
                      <Box py={5}>
                        <Typography color="text.secondary">
                          No donors found.
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </AppCard>

      <BloodLabelDialog
        open={openLabel}
        onClose={handleClose}
        donor={selectedDonor}
      />
    </>
  );
};

export default DonorTable;