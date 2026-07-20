import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";

import BloodLabelCard from "./BloodLabelCard";

const BloodLabelDialog = ({
  open,
  donor,
  onClose,
}) => {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: donor?.unitNumber || "Blood Label",
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        Blood Bag Label

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          bgcolor: "#F5F7FA",
          py: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box ref={printRef}>
            <BloodLabelCard donor={donor} />
          </Box>
        </Box>
      </DialogContent>

      <Box
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "#fff",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{
              minWidth: 150,
            }}
          >
            Print Label
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default BloodLabelDialog;