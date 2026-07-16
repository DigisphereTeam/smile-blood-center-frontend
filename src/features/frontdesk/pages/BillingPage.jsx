import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { toast } from "react-toastify";

import PageHeader from "../../../components/common/PageHeader";

import BillingStats from "../components/billing/BillingStats";
import BillingQueue from "../components/billing/BillingQueue";
import BillingPatientSummary from "../components/billing/BillingPatientSummary";
import ReplacementDonorCard from "../components/billing/ReplacementDonorCard";
import ChargesSummaryCard from "../components/billing/ChargesSummaryCard";

import {
  getBillingPatients,
  generateInvoice,
} from "../../storage/requisitionStorageApi";
import GenerateInvoiceDialog from "../components/billing/GenerateInvoiceDialog";

const BillingPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");

  const [hasReplacement, setHasReplacement] = useState(false);
  const [donorCount, setDonorCount] = useState(1);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

  const loadBillingPatients = () => {
    const billingPatients = getBillingPatients();

    setPatients(billingPatients);

    if (billingPatients.length > 0) {
      setSelectedPatient(billingPatients[0]);
    } else {
      setSelectedPatient(null);
    }
  };

  useEffect(() => {
    loadBillingPatients();
  }, []);

  const handleReplacementChange = (event) => {
    setHasReplacement(event.target.checked);
  };

  const handleDonorCountChange = (event) => {
    setDonorCount(event.target.value);
  };

  const handleGenerateInvoice = () => {
    if (!selectedPatient) {
      toast.warning("Please select a patient.");
      return;
    }

    const processingCharge = 150;
    const testingCharge = 200;
    const crossMatchCharge = 100;
    const componentCharge = 1000;

    const subtotal =
      processingCharge + testingCharge + crossMatchCharge + componentCharge;

    const tax = subtotal * 0.05;

    const total = subtotal + tax;

    generateInvoice(selectedPatient, total);

    toast.success("Invoice generated successfully.");

    loadBillingPatients();
  };

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Billing & Receipt"
        subtitle="Generate invoices for patients with completed lab processing."
      />

      <BillingStats />

      <Grid container spacing={3}>
        {/* Left Panel */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <BillingQueue
            patients={patients}
            selectedPatient={selectedPatient}
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            onSelectPatient={setSelectedPatient}
          />
        </Grid>

        {/* Right Panel */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={3}>
            <BillingPatientSummary patient={selectedPatient} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ReplacementDonorCard
                  hasReplacement={hasReplacement}
                  donorCount={donorCount}
                  onReplacementChange={handleReplacementChange}
                  onDonorCountChange={handleDonorCountChange}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <ChargesSummaryCard
                  onGenerateInvoice={() => setInvoiceDialogOpen(true)}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      {/* Generate Invoice Dialog */}
      <GenerateInvoiceDialog
        open={invoiceDialogOpen}
        patient={selectedPatient}
        onClose={() => setInvoiceDialogOpen(false)}
        onGenerate={(amount) => {
          generateInvoice(selectedPatient, amount);

          toast.success("Invoice generated successfully.");

          setInvoiceDialogOpen(false);

          loadBillingPatients();
        }}
      />
    </Stack>
  );
};

export default BillingPage;
