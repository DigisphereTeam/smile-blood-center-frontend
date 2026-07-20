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

const ChargeRow = ({
  label,
  amount,
  bold = false,
  color = "text.primary",
}) => (
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      width: "100%",
      py: 0.25,
    }}
  >
    <Typography
      color={color}
      fontWeight={bold ? 600 : 400}
      sx={{ flex: 1 }}
    >
      {label}
    </Typography>

    <Typography
      fontWeight={bold ? 600 : 500}
      sx={{
        width: 120,
        textAlign: "right",
        flexShrink: 0,
      }}
    >
      ₹{amount.toFixed(2)}
    </Typography>
  </Stack>
);

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
          <Stack spacing={1.25}>
            <ChargeRow
              label="Processing Charge"
              amount={processingCharge}
            />

            <ChargeRow
              label="Testing Charge"
              amount={testingCharge}
            />

            <ChargeRow
              label="Cross Match Charge"
              amount={crossMatchCharge}
            />

            <ChargeRow
              label="Component Charge"
              amount={componentCharge}
            />

            <Divider />

            <ChargeRow
              label="Subtotal"
              amount={subtotal}
              bold
            />

            <ChargeRow
              label="GST (5%)"
              amount={tax}
            />

            <Divider />

            <Stack
              direction="row"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ flex: 1 }}
              >
                Total Amount
              </Typography>

              <Typography
                variant="h6"
                color="primary.main"
                fontWeight={700}
                sx={{
                  width: 120,
                  textAlign: "right",
                  flexShrink: 0,
                }}
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