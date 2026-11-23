import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { toast } from "react-toastify";

import PageHeader from "../../../components/common/PageHeader";

import BillingStats from "../components/billing/BillingStats";
import BillingQueue from "../components/billing/BillingQueue";
import BillingPatientSummary from "../components/billing/BillingPatientSummary";
import ReplacementDonorCard from "../components/billing/ReplacementDonorCard";
import ChargesSummaryCard from "../components/billing/ChargesSummaryCard";
import GenerateInvoiceDialog from "../components/billing/GenerateInvoiceDialog";

// Static patient data
const staticBillingPatients = [
  {
    id: 1,
    patientId: "PAT-2026-001",
    patientName: "Rahul Sharma",
    age: 32,
    gender: "Male",
    bloodGroup: "O+",
    component: "Packed Red Blood Cells",
    units: 2,
    hospital: "Apollo Hospitals",
    doctor: "Dr. Suresh Kumar",
    requestDate: "2026-11-20",
    status: "Ready for Billing",
    contact: "9876543210",
  },
  {
    id: 2,
    patientId: "PAT-2026-002",
    patientName: "Priya Reddy",
    age: 27,
    gender: "Female",
    bloodGroup: "B+",
    component: "Platelets",
    units: 1,
    hospital: "Manipal Hospital",
    doctor: "Dr. Anjali Rao",
    requestDate: "2026-11-21",
    status: "Ready for Billing",
    contact: "9876543211",
  },
  {
    id: 3,
    patientId: "PAT-2026-003",
    patientName: "Arjun Varma",
    age: 45,
    gender: "Male",
    bloodGroup: "A+",
    component: "Fresh Frozen Plasma",
    units: 3,
    hospital: "KIMS Hospital",
    doctor: "Dr. Ravi Teja",
    requestDate: "2026-11-21",
    status: "Ready for Billing",
    contact: "9876543212",
  },
  {
    id: 4,
    patientId: "PAT-2026-004",
    patientName: "Sneha Patel",
    age: 35,
    gender: "Female",
    bloodGroup: "AB+",
    component: "Whole Blood",
    units: 1,
    hospital: "Rainbow Hospital",
    doctor: "Dr. Meena",
    requestDate: "2026-11-22",
    status: "Ready for Billing",
    contact: "9876543213",
  },
  {
    id: 5,
    patientId: "PAT-2026-005",
    patientName: "Vikram Singh",
    age: 51,
    gender: "Male",
    bloodGroup: "O-",
    component: "Packed Red Blood Cells",
    units: 2,
    hospital: "City Care Hospital",
    doctor: "Dr. Kiran",
    requestDate: "2026-11-22",
    status: "Ready for Billing",
    contact: "9876543214",
  },
];

const BillingPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");

  const [hasReplacement, setHasReplacement] = useState(false);
  const [donorCount, setDonorCount] = useState(1);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

  // Load static data
  useEffect(() => {
    setPatients(staticBillingPatients);
    setSelectedPatient(staticBillingPatients[0]);
  }, []);

  const handleReplacementChange = (event) => {
    setHasReplacement(event.target.checked);
  };

  const handleDonorCountChange = (event) => {
    setDonorCount(event.target.value);
  };

  // Static invoice generation
  const handleGenerateInvoice = (amount) => {
    if (!selectedPatient) {
      toast.warning("Please select a patient.");
      return;
    }

    const invoice = {
      invoiceId: `INV-${Date.now()}`,
      patientId: selectedPatient.patientId,
      patientName: selectedPatient.patientName,
      amount,
      date: new Date().toISOString().split("T")[0],
      status: "Generated",
    };

    console.log("Generated Invoice:", invoice);

    // Remove billed patient from the queue
    setPatients((prev) =>
      prev.filter((patient) => patient.id !== selectedPatient.id)
    );

    setSelectedPatient(null);
    setInvoiceDialogOpen(false);

    toast.success("Invoice generated successfully.");
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
        onGenerate={handleGenerateInvoice}
      />
    </Stack>
  );
};

export default BillingPage;





// import { useEffect, useState } from "react";
// import { Grid, Stack } from "@mui/material";
// import { toast } from "react-toastify";

// import PageHeader from "../../../components/common/PageHeader";

// import BillingStats from "../components/billing/BillingStats";
// import BillingQueue from "../components/billing/BillingQueue";
// import BillingPatientSummary from "../components/billing/BillingPatientSummary";
// import ReplacementDonorCard from "../components/billing/ReplacementDonorCard";
// import ChargesSummaryCard from "../components/billing/ChargesSummaryCard";

// import {
//   getBillingPatients,
//   generateInvoice,
// } from "../../storage/requisitionStorageApi";
// import GenerateInvoiceDialog from "../components/billing/GenerateInvoiceDialog";

// const BillingPage = () => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [search, setSearch] = useState("");

//   const [hasReplacement, setHasReplacement] = useState(false);
//   const [donorCount, setDonorCount] = useState(1);
//   const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

//   const loadBillingPatients = () => {
//     const billingPatients = getBillingPatients();

//     setPatients(billingPatients);

//     if (billingPatients.length > 0) {
//       setSelectedPatient(billingPatients[0]);
//     } else {
//       setSelectedPatient(null);
//     }
//   };

//   useEffect(() => {
//     loadBillingPatients();
//   }, []);

//   const handleReplacementChange = (event) => {
//     setHasReplacement(event.target.checked);
//   };

//   const handleDonorCountChange = (event) => {
//     setDonorCount(event.target.value);
//   };

//   const handleGenerateInvoice = () => {
//     if (!selectedPatient) {
//       toast.warning("Please select a patient.");
//       return;
//     }

//     const processingCharge = 150;
//     const testingCharge = 200;
//     const crossMatchCharge = 100;
//     const componentCharge = 1000;

//     const subtotal =
//       processingCharge + testingCharge + crossMatchCharge + componentCharge;

//     const tax = subtotal * 0.05;

//     const total = subtotal + tax;

//     generateInvoice(selectedPatient, total);

//     toast.success("Invoice generated successfully.");

//     loadBillingPatients();
//   };

//   return (
//     <Stack spacing={3}>
//       <PageHeader
//         title="Billing & Receipt"
//         subtitle="Generate invoices for patients with completed lab processing."
//       />

//       <BillingStats />

//       <Grid container spacing={3}>
//         {/* Left Panel */}
//         <Grid size={{ xs: 12, lg: 5 }}>
//           <BillingQueue
//             patients={patients}
//             selectedPatient={selectedPatient}
//             search={search}
//             onSearchChange={(e) => setSearch(e.target.value)}
//             onSelectPatient={setSelectedPatient}
//           />
//         </Grid>

//         {/* Right Panel */}
//         <Grid size={{ xs: 12, lg: 7 }}>
//           <Stack spacing={3}>
//             <BillingPatientSummary patient={selectedPatient} />

//             <Grid container spacing={3}>
//               <Grid size={{ xs: 12, md: 6 }}>
//                 <ReplacementDonorCard
//                   hasReplacement={hasReplacement}
//                   donorCount={donorCount}
//                   onReplacementChange={handleReplacementChange}
//                   onDonorCountChange={handleDonorCountChange}
//                 />
//               </Grid>

//               <Grid size={{ xs: 12, md: 6 }}>
//                 <ChargesSummaryCard
//                   onGenerateInvoice={() => setInvoiceDialogOpen(true)}
//                 />
//               </Grid>
//             </Grid>
//           </Stack>
//         </Grid>
//       </Grid>
//       {/* Generate Invoice Dialog */}
//       <GenerateInvoiceDialog
//         open={invoiceDialogOpen}
//         patient={selectedPatient}
//         onClose={() => setInvoiceDialogOpen(false)}
//         onGenerate={(amount) => {
//           generateInvoice(selectedPatient, amount);

//           toast.success("Invoice generated successfully.");

//           setInvoiceDialogOpen(false);

//           loadBillingPatients();
//         }}
//       />
//     </Stack>
//   );
// };

// export default BillingPage;
