import { Collapse, Grid } from "@mui/material";
import { useWatch } from "react-hook-form";
import AppCard from "../../../../components/common/AppCard";
import SectionHeader from "../../../../components/common/SectionHeader";
import FormCheckbox from "../../../../components/common/FormCheckBox";
import FormRadioGroup from "../../../../components/common/FormRadioGroup";
import RHFTextField from "../../../../components/common/RHFTextField";

const transfusionOptions = [
  { label: "Surgery", value: "Surgery" },
  { label: "Anemia", value: "Anemia" },
  { label: "Coagulopathy", value: "Coagulopathy" },
  { label: "Thrombocytopenia", value: "Thrombocytopenia" },
  { label: "Dialysis", value: "Dialysis" },
  { label: "Burns", value: "Burns" },
  { label: "Newborn", value: "Newborn" },
  { label: "Others", value: "Others" },
];

const yesNoOptions = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

const TransfusionIndication = ({
  control,
  disabled = false,
}) => {
  const previousReaction = useWatch({
    control,
    name: "previousReaction",
  });

  return (
    <AppCard sx={{ mb: 2 }}>
      <SectionHeader title="Step 2 : Transfusion Indication" />

      <Grid container spacing={3}>
        {/* Transfusion Indications */}

        <Grid size={12}>
          <SectionHeader
            title="Select all applicable transfusion indications"
            sx={{
              mb: 2,
              fontSize: 16,
            }}
          />

          <Grid container spacing={2}>
            {transfusionOptions.map((option) => (
              <Grid
                key={option.value}
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
              >
                <FormCheckbox
                  control={control}
                  name={`transfusionIndications.${option.value}`}
                  label={option.label}
                  disabled={disabled}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Previous Transfusion */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <FormRadioGroup
            control={control}
            name="previousTransfusion"
            label="History of Previous Transfusion"
            options={yesNoOptions}
            isBoolean
            disabled={disabled}
          />
        </Grid>

        {/* Previous Reaction */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <FormRadioGroup
            control={control}
            name="previousReaction"
            label="Any History of Previous Transfusion Reaction"
            options={yesNoOptions}
            isBoolean
            disabled={disabled}
          />
        </Grid>

        {/* Reaction Details */}

        <Grid size={12}>
          <Collapse in={previousReaction}>
            <RHFTextField
              control={control}
              name="reactionDetails"
              label="If Yes, Reaction if any during previous transfusion"
              multiline
              rows={3}
              disabled={disabled}
            />
          </Collapse>
        </Grid>
      </Grid>
    </AppCard>
  );
};

export default TransfusionIndication;