{
  // -------------------------------
  // Common
  // -------------------------------
  id,
  requisitionId,
  status,
  createdAt,

  // -------------------------------
  // Frontdesk
  // -------------------------------
  patientName,
  age,
  gender,
  hospital,
  bloodGroup,
  diagnosis,
  referredBy,
  wardNumber,
  ipNumber,

  transfusionIndications,
  previousTransfusion,
  previousReaction,
  reactionDetails,

  bloodComponents,

  isEmergency,
  requirementSelection,
  physicianName,

  // -------------------------------
  // Lab
  // -------------------------------
  lab: {
    technician: "",
    startedAt: null,
    completedAt: null,

    compatibilityStatus: "Pending",
    compatibilityRemarks: "",

    labelsGenerated: false,
  },

  // -------------------------------
  // Billing
  // -------------------------------
  billing: {
    invoiceNumber: "",
    invoiceGenerated: false,

    amount: 0,

    paymentStatus: "Pending",

    billedAt: null,
  },
}