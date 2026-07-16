import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
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


import AppCard from "../../../../components/common/AppCard";
import SearchField from "../../../../components/common/SearchField";

import { bloodGroups } from "../../../../constants/frontdeskMockData";

const DonorTable = ({ donors = [] }) => {

  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        donor.donorName?.toLowerCase().includes(searchText) ||
        donor.donorId?.toLowerCase().includes(searchText) ||
        donor.unitNumber?.toLowerCase().includes(searchText);

      const matchesBloodGroup =
        bloodGroup === "All" ||
        donor.bloodGroup === bloodGroup;

      const matchesStatus =
        status === "All" ||
        donor.status === status;

      return (
        matchesSearch &&
        matchesBloodGroup &&
        matchesStatus
      );
    });
  }, [donors, search, bloodGroup, status]);

  return (
    <AppCard>
      <Stack spacing={3}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            Donor List ({filteredDonors.length})
          </Typography>

        </Stack>

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

            <MenuItem value="Available">
              Available
            </MenuItem>

            <MenuItem value="Reserved">
              Reserved
            </MenuItem>

            <MenuItem value="Issued">
              Issued
            </MenuItem>

            <MenuItem value="Expired">
              Expired
            </MenuItem>
          </TextField>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Donor ID</TableCell>
                <TableCell>Unit Number</TableCell>
                <TableCell>Donor Name</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Component</TableCell>
                <TableCell>Donation Type</TableCell>
                <TableCell>Status</TableCell>
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
                      {donor.component}
                    </TableCell>

                    <TableCell>
                      {donor.donationType}
                    </TableCell>

                    <TableCell>
                      {donor.status}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                  >
                    <Box py={5}>
                      <Typography
                        color="text.secondary"
                      >
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
  );
};

export default DonorTable;