import dayjs from "dayjs";
import { Box, Typography, Paper } from "@mui/material";
import { BLOOD_GROUP_THEME } from "../../../../constants/bloodLabelTheme";

const formatDate = (date) => {
  if (!date) return "--";
  return dayjs(date).format("DD MMM YYYY");
};

const HeaderSection = () => (
  <Box
    sx={{
      textAlign: "center",
      borderBottom: "2px solid #000",
      backgroundColor: "primary.main",
      color: "#fff",
      px: 2,
      py: 1,
    }}
  >
    <Typography
      sx={{
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: 1,
      }}
    >
      SMILE BLOOD CENTRE
    </Typography>

    <Typography fontSize={13}>
      #29-13-43A, Kaleswararao Road, Suryaraopeta, Vijayawada - 520002
    </Typography>
  </Box>
);

const BloodGroupSection = ({ donor, theme }) => {
  const bloodGroup = `${donor.bloodGroup}${
    donor.rhType === "Positive" ? "+" : "-"
  }`;

  return (
    <Box
      sx={{
        py: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(180deg,#FFFDFD 0%, #FDEEEE 100%)",
        borderBottom: "2px solid #1F2937",
      }}
    >
      <Box
        sx={{
          width: 190,
          height: 190,
          borderRadius: 3,

          bgcolor: theme.cardBackground,

          border: "2px solid #263445",

          boxShadow: "0 16px 30px rgba(0,0,0,.25)",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 82,
            fontWeight: 900,
            color: theme.text,
            lineHeight: 1,
            letterSpacing: -2,
          }}
        >
          {bloodGroup}
        </Typography>
      </Box>
    </Box>
  );
};

const ProductSection = ({ donor }) => (
  <>
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        py: 1,
        borderBottom: "2px solid #000",
      }}
    >
      <Typography fontWeight={800} fontSize={20}>
        {donor.component?.replaceAll("_", " ").toUpperCase()} - I.P
      </Typography>
      <Typography fontSize={15} fontWeight={600}>
        Whole Human Blood I.P. 450 ml of Blood + 63 ml of CPDA Solution
      </Typography>
    </Box>
  </>
);

const InfoCell = ({ label, value, valueColor = "#111827", last = false }) => (
  <Box
    sx={{
      px: 2.5,
      py: 2,
      minHeight: 76,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderBottom: last ? "none" : "1px solid #D5DDE5",
    }}
  >
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 700,
        color: "#4B5563",
        textTransform: "uppercase",
        letterSpacing: 0.2,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        mt: 0.6,
        fontSize: 17,
        fontWeight: 700,
        color: valueColor,
        lineHeight: 1.2,
      }}
    >
      {value}
    </Typography>
  </Box>
);
const InfectionScreening = () => (
  <Box
    sx={{
      px: 2.5,
      py: 1.8,
      minHeight: 132,
    }}
  >
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 700,
        color: "#4B5563",
        mb: 1,
        letterSpacing: 0.3,
        textTransform: "uppercase",
      }}
    >
      INFECTION SCREENING
    </Typography>

    {["HIV I/II", "HBsAg", "HCV", "VDRL", "Malaria"].map((test) => (
      <Box
        key={test}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {test}:
        </Typography>

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: "#0A8F3C",
          }}
        >
          {test === "Malaria" ? "Negative" : "Non-Reactive"}
        </Typography>
      </Box>
    ))}
  </Box>
);

const BloodLabelCard = ({ donor }) => {
  if (!donor) return null;

  const bloodGroupKey = `${donor.bloodGroup}${
    donor.rhType === "Positive" ? "+" : "-"
  }`;

  const theme = BLOOD_GROUP_THEME[bloodGroupKey] || BLOOD_GROUP_THEME["A+"];

  return (
    <Paper
      elevation={0}
      id="blood-label"
      sx={{
        width: 720,
        mx: "auto",
        border: "3px solid #000",
        borderRadius: 0,
        overflow: "hidden",
      }}
    >
      <HeaderSection />

      <BloodGroupSection donor={donor} theme={theme} />

      <ProductSection donor={donor} theme={theme} />

      {/* Information Table */}
      <Box
        sx={{
          display: "flex",
          borderTop: "1px solid #D5DDE5",
          borderBottom: "1px solid #D5DDE5",
        }}
      >
        {/* LEFT */}
        <Box sx={{ flex: 1 }}>
          <InfoCell label="UNIT NUMBER" value={donor.unitNumber} />

          <InfoCell label="DONOR ID" value={donor.donorId} />

          <InfoCell label="DONOR TYPE" value="Voluntary Donor" />

          <InfoCell
            label="COLLECTION DATE"
            value={formatDate(donor.collectionDate)}
            valueColor="#2563EB"
            last
          />
        </Box>

        {/* RIGHT */}
        <Box sx={{ flex: 1, borderLeft: "1px solid #D5DDE5" }}>
          <InfoCell
            label="EXPIRY DATE"
            value={formatDate(donor.expiryDate)}
            valueColor="#E53935"
          />

          <InfoCell
            label="STORAGE TEMPERATURE"
            value="2°C to 6°C"
            valueColor="#2563EB"
          />

          <InfectionScreening />
        </Box>
      </Box>

      {/* Instructions */}

      <Box
        sx={{
          bgcolor: "#FFFBEA",
          borderTop: "4px solid #FACC15",
          px: 2.5,
          py: 1.8,
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: "#8A5A00",
            mb: 1,
          }}
        >
          ⚠ IMPORTANT SAFETY INSTRUCTIONS
        </Typography>

        <Box
          component="ul"
          sx={{
            m: 0,
            pl: 2,
            color: "#374151",
            fontSize: 11,
            lineHeight: 1.7,
          }}
        >
          <li>Store continuously at 2°C to 6°C. Do not freeze.</li>

          <li>
            Use sterile disposable transfusion set with filter for
            administration.
          </li>

          <li>
            Verify blood group compatibility before transfusion. Check patient &
            label match.
          </li>

          <li>
            Do not transfuse if bag shows signs of contamination, haemolysis,
            leakage or discoloration.
          </li>

          <li>Do not add medications or solutions to blood bag.</li>

          <li>
            Complete transfusion within 4 hours of removal from refrigeration.
          </li>

          <li>
            Report any adverse reactions immediately to blood bank medical
            officer.
          </li>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#1F2937",
          color: "#fff",
          py: 0.7,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        >
          FOR SINGLE USE ONLY • DISCARD AFTER USE • VALID FOR 24 HOURS POST
          CROSS-MATCH
        </Typography>
      </Box>
    </Paper>
  );
};

export default BloodLabelCard;
