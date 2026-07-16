import { Divider, Stack, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import AppButton from "../../../../components/common/AppButton";

const ChargeRow = ({
  label,
  amount,
  bold = false,
  color = "text.secondary",
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ py: 0.25 }}
  >
    <Typography color={color} fontWeight={bold ? 600 : 400}>
      {label}
    </Typography>

    <Typography
      fontWeight={500}
      sx={{
        minWidth: 90,
        textAlign: "right",
      }}
    >
      ₹{amount.toFixed(2)}
    </Typography>
  </Stack>
);

const ChargesSummaryCard = ({
  processingCharge = 150,
  testingCharge = 200,
  crossMatchCharge = 100,
  componentCharge = 1000,
  onGenerateInvoice,
}) => {
  const subtotal =
    processingCharge + testingCharge + crossMatchCharge + componentCharge;

  const tax = subtotal * 0.05;

  const total = subtotal + tax;

  return (
    <AppCard sx={{ height: "100%" }}>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={600}>
          Charges Summary
        </Typography>

        <Stack spacing={1.25}>
          <ChargeRow label="Processing" amount={processingCharge} />

          <ChargeRow label="Testing" amount={testingCharge} />

          <ChargeRow label="Cross Match" amount={crossMatchCharge} />

          <ChargeRow label="Component" amount={componentCharge} />

          <Divider />

          <ChargeRow label="Subtotal" amount={subtotal} />

          <ChargeRow label="Tax (5%)" amount={tax} />

          <Divider />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Total Amount
            </Typography>

            <Typography variant="h6" color="error.main" fontWeight={700}>
              ₹{total.toFixed(2)}
            </Typography>
          </Stack>
        </Stack>

        <AppButton fullWidth onClick={onGenerateInvoice}>
          Generate Invoice
        </AppButton>
      </Stack>
    </AppCard>
  );
};

export default ChargesSummaryCard;
