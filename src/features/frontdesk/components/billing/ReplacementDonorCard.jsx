import { Stack, Switch, Typography } from "@mui/material";

import AppCard from "../../../../components/common/AppCard";
import AppSelect from "../../../../components/common/AppSelect";

const ReplacementDonorCard = ({
  hasReplacement,
  donorCount,
  onReplacementChange,
  onDonorCountChange,
}) => {
  return (
    <AppCard>
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight={600}>
            Replacement Donor
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">
              Has Replacement
            </Typography>

            <Switch
              checked={hasReplacement}
              onChange={onReplacementChange}
              color="success"
            />
          </Stack>
        </Stack>

        <AppSelect
          label="No. of Donors"
          value={donorCount}
          onChange={onDonorCountChange}
          disabled={!hasReplacement}
          options={[1, 2, 3, 4, 5]}
        />
      </Stack>
    </AppCard>
  );
};

export default ReplacementDonorCard;