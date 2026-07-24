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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import AppCard from "../../../../components/common/AppCard";
import SearchField from "../../../../components/common/SearchField";
import StatusChip from "../../../../components/common/StatusChip";
import BloodLabelDialog from "./BloodLabelDialog";

const bloodGroups = ["A", "B", "AB", "O"];

const DonorTable = ({ donors = [], onEdit }) => {
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");

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
    const searchText = search.trim().toLowerCase();

    return donors.filter((donor) => {
      const matchesSearch =
        donor.name?.toLowerCase().includes(searchText) ||
        donor.donor_code?.toLowerCase().includes(searchText) ||
        donor.phone_number?.includes(search);

      const matchesBloodGroup =
        bloodGroup === "All" ||
        donor.blood_group === bloodGroup;

      return (
        matchesSearch &&
        matchesBloodGroup
      );
    });
  }, [donors, search, bloodGroup]);

  return (
    <>
      <AppCard>
        <Stack spacing={3}>
          <Typography
            variant="h6"
            fontWeight={600}
          >
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
              placeholder="Search donor, donor code or mobile..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
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
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Donor Code</TableCell>
                  <TableCell>Donor Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Donation Type</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Created By</TableCell>
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
                      key={donor.id}
                    >
                      <TableCell>
                        {donor.donor_code ??
                          "-"}
                      </TableCell>

                      <TableCell>
                        {donor.name}
                      </TableCell>

                      <TableCell>
                        {donor.gender}
                      </TableCell>

                      <TableCell>
                        {donor.age}
                      </TableCell>

                      <TableCell>
                        {`${donor.blood_group}${donor.rh_type}`}
                      </TableCell>

                      <TableCell>
                        {donor.donation_type}
                      </TableCell>

                      <TableCell>
                        {
                          donor.phone_number
                        }
                      </TableCell>

                      <TableCell>
                        {donor.created_by_name?.trim() ||
                          "-"}
                      </TableCell>

                      <TableCell>
                        <StatusChip
                          status={
                            donor.is_active
                              ? "Active"
                              : "Inactive"
                          }
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={0.5}
                        >
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleView(
                                donor
                              )
                            }
                          >
                            <VisibilityOutlinedIcon />
                          </IconButton>

                          <IconButton
                            color="secondary"
                            onClick={() =>
                              onEdit(
                                donor.id
                              )
                            }
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
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