import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AppButton from "../../../../components/common/AppButton";

const GenerateInvoiceDialog = ({
  open,
  patient,
  processingCharge = 150,
  testingCharge = 200,
  crossMatchCharge = 100,
  componentCharge = 1000,
  onClose,
  onGenerate,
}) => {
  if (!patient) return null;

  const subtotal =
    processingCharge +
    testingCharge +
    crossMatchCharge +
    componentCharge;

  const tax = subtotal * 0.05;

  const total = subtotal + tax;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Generate Invoice</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Patient Details */}
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={600}>
              {patient.patientName}
            </Typography>

            <Typography color="text.secondary">
              {patient.requisitionId}
            </Typography>
          </Stack>

          <Divider />

          {/* Charges */}
          <Stack spacing={1.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Processing Charge</Typography>

              <Typography>
                ₹{processingCharge.toFixed(2)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Testing Charge</Typography>

              <Typography>
                ₹{testingCharge.toFixed(2)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Cross Match Charge</Typography>

              <Typography>
                ₹{crossMatchCharge.toFixed(2)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Component Charge</Typography>

              <Typography>
                ₹{componentCharge.toFixed(2)}
              </Typography>
            </Stack>

            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Subtotal</Typography>

              <Typography>
                ₹{subtotal.toFixed(2)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography>GST (5%)</Typography>

              <Typography>
                ₹{tax.toFixed(2)}
              </Typography>
            </Stack>

            <Divider />

            <Stack
              direction="row"
              justifyContent="space-between"
            >
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Total Amount
              </Typography>

              <Typography
                variant="h6"
                color="primary.main"
                fontWeight={700}
              >
                ₹{total.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <AppButton
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </AppButton>

        <AppButton onClick={() => onGenerate(total)}>
          Generate Invoice
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateInvoiceDialog;