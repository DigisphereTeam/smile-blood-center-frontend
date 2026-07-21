import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import AppCard from "../../../../components/common/AppCard";
import SectionHeader from "../../../../components/common/SectionHeader";
import { bloodComponents } from "../../../../constants/frontdeskMockData";
import FormDateTimePicker from "../../../../components/common/FormDateTimePicker";
import RHFTextField from "../../../../components/common/RHFTextField";
import RHFSelect from "../../../../components/common/RHFSelect";

const BloodComponentTable = ({
  control,
  disabled = false,
}) => {
  return (
    <AppCard sx={{ mb: 2 }}>
      <SectionHeader title="Step 3 : Blood Component Requirement" />

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="40%">Blood Component</TableCell>

              <TableCell width="15%">Units</TableCell>

              <TableCell width="30%">Required Date & Time</TableCell>

              <TableCell width="15%" align="center">
                Reserve
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bloodComponents.map((component, index) => (
              <TableRow key={component.value} hover>
                {/* Component Name */}

                <TableCell
                  sx={{
                    verticalAlign: "middle",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Controller
                      control={control}
                      name={`bloodComponents.${index}.selected`}
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value}
                          disabled={disabled}
                          onChange={(e) =>
                            field.onChange(e.target.checked)
                          }
                          sx={{
                            p: 0.5,
                          }}
                        />
                      )}
                    />

                    <Typography
                      sx={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {component.name}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Units */}

                <TableCell>
                  <RHFTextField
                    control={control}
                    name={`bloodComponents.${index}.units`}
                    type="number"
                    placeholder="0"
                    disabled={disabled}
                  />
                </TableCell>

                {/* Required Date & Time */}

                <TableCell>
                  <FormDateTimePicker
                    control={control}
                    name={`bloodComponents.${index}.requiredDateTime`}
                    disabled={disabled}
                  />
                </TableCell>

                {/* Reserve */}

                <TableCell align="center">
                  <RHFSelect
                    control={control}
                    name={`bloodComponents.${index}.reserve`}
                    options={[
                      { label: "No", value: false },
                      { label: "Yes", value: true },
                    ]}
                    isBoolean
                    disabled={disabled}
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

export default BloodComponentTable;