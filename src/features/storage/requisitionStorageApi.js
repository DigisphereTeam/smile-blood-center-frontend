// Later we will replace this with requisitionApi.js //

import dayjs from "dayjs";

import {
  REQUISITION_STATUS,
  COMPATIBILITY_STATUS,
  PAYMENT_STATUS,
} from "../../constants/statusConstants";

const STORAGE_KEY = "patient_requisitions";

/**
 * Get all requisitions
 */
export const getPatients = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Get single requisition
 */
export const getPatientById = (id) => {
  const patients = getPatients();
  return patients.find((patient) => patient.id === id);
};

/**
 * Save new requisition
 */
export const savePatient = (patient) => {
  const patients = getPatients();

  const now = dayjs().toISOString();

  const newPatient = {
    // ==================================================
    // Frontdesk Data
    // ==================================================
    ...patient,

    // ==================================================
    // Common
    // ==================================================
    id: crypto.randomUUID(),

    requisitionId: `BB-${dayjs().year()}-${String(
      patients.length + 1
    ).padStart(3, "0")}`,

    status: REQUISITION_STATUS.PENDING,

    createdAt: now,

    updatedAt: now,

    // ==================================================
    // Lab Module
    // ==================================================
    lab: {
      technician: "",

      startedAt: null,

      completedAt: null,

      currentStep: 0,

      bloodGrouping: {
        confirmedABOGroup: "",
        confirmedRhType: "",
      },

      donorDetails: {
        unitNo: "",
        bloodGroup: "",
        collectionDate: null,
        expiryDate: null,
        component: "",
        volume: "",
        viralScreening: "",
      },

      crossMatching: {
        bloodGroup: "",
        donorComponent: "",
        collectionDate: null,
        expiryDate: null,
        issueNumber: "",
        crossMatchingResult: "",
      },

      compatibilityStatus: COMPATIBILITY_STATUS.PENDING,

      compatibilityRemarks: "",

      labelsGenerated: false,
    },

    // ==================================================
    // Billing Module
    // ==================================================
    billing: {
      invoiceNumber: "",

      invoiceGenerated: false,

      amount: 0,

      paymentStatus: PAYMENT_STATUS.PENDING,

      billedAt: null,
    },
  };

  patients.push(newPatient);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));

  return newPatient;
};

/**
 * Update requisition
 */
export const updatePatient = (updatedPatient) => {
  const patients = getPatients();

  const updatedPatients = patients.map((patient) =>
    patient.id === updatedPatient.id
      ? {
          ...updatedPatient,
          updatedAt: dayjs().toISOString(),
        }
      : patient
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPatients));

  return updatedPatient;
};

/**
 * Delete requisition
 */
export const deletePatient = (id) => {
  const patients = getPatients();

  const updatedPatients = patients.filter(
    (patient) => patient.id !== id
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPatients));

  return updatedPatients;
};

// ==================================================
// Billing Module
// ==================================================

/**
 * Billing dashboard statistics
 */
export const getBillingStats = () => {
  const patients = getPatients();

  const labCompleted = patients.filter(
    (patient) => patient.status === REQUISITION_STATUS.COMPLETED
  ).length;

  const pendingBilling = patients.filter(
    (patient) =>
      patient.status === REQUISITION_STATUS.COMPLETED &&
      !patient.billing.invoiceGenerated
  ).length;

  const todayRevenue = patients
    .filter((patient) => patient.billing.invoiceGenerated)
    .reduce(
      (total, patient) => total + (patient.billing.amount || 0),
      0
    );

  return {
    labCompleted,
    pendingBilling,
    todayRevenue,
  };
};

/**
 * Patients ready for billing
 */
export const getBillingPatients = () => {
  const patients = getPatients();

  return patients.filter(
    (patient) =>
      patient.status === REQUISITION_STATUS.COMPLETED &&
      !patient.billing.invoiceGenerated
  );
};

/**
 * Generate invoice number
 */
export const generateInvoiceNumber = () => {
  const patients = getPatients();

  const invoiceCount = patients.filter(
    (patient) => patient.billing.invoiceGenerated
  ).length;

  return `INV-${dayjs().year()}-${String(
    invoiceCount + 1
  ).padStart(3, "0")}`;
};

/**
 * Generate invoice
 */
export const generateInvoice = (patient, amount) => {
  const updatedPatient = {
    ...patient,

    billing: {
      ...patient.billing,

      invoiceGenerated: true,

      invoiceNumber: generateInvoiceNumber(),

      amount,

      paymentStatus: PAYMENT_STATUS.PAID,

      billedAt: dayjs().toISOString(),
    },
  };

  updatePatient(updatedPatient);

  return updatedPatient;
};