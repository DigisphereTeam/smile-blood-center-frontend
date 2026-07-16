import crypto from "crypto";
import dayjs from "dayjs";

import {
  REQUISITION_STATUS,
  COMPATIBILITY_STATUS,
  PAYMENT_STATUS,
} from "../constants/statusConstants";

const createMockPatient = ({
  requisitionId,
  patientName,
  age,
  gender,
  bloodGroup,
}) => ({
  // ==================================================
  // Frontdesk Data
  // ==================================================
  id: crypto.randomUUID(),

  requisitionId,

  patientName,

  age,

  gender,

  bloodGroup,

  // ==================================================
  // Common
  // ==================================================
  status: REQUISITION_STATUS.PENDING,

  createdAt: dayjs().toISOString(),

  updatedAt: dayjs().toISOString(),

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
});

export const initialPatients = [
  createMockPatient({
    requisitionId: "BB-2026-001",
    patientName: "Rahul Sharma",
    age: 35,
    gender: "Male",
    bloodGroup: "A+",
  }),

  createMockPatient({
    requisitionId: "BB-2026-002",
    patientName: "Priya Reddy",
    age: 28,
    gender: "Female",
    bloodGroup: "O+",
  }),

  createMockPatient({
    requisitionId: "BB-2026-003",
    patientName: "Suresh Kumar",
    age: 42,
    gender: "Male",
    bloodGroup: "B+",
  }),

  createMockPatient({
    requisitionId: "BB-2026-004",
    patientName: "Anjali Verma",
    age: 31,
    gender: "Female",
    bloodGroup: "AB+",
  }),

  createMockPatient({
    requisitionId: "BB-2026-005",
    patientName: "Kiran Patel",
    age: 26,
    gender: "Male",
    bloodGroup: "O-",
  }),

  createMockPatient({
    requisitionId: "BB-2026-006",
    patientName: "Sneha Nair",
    age: 38,
    gender: "Female",
    bloodGroup: "A-",
  }),

  createMockPatient({
    requisitionId: "BB-2026-007",
    patientName: "Arjun Rao",
    age: 47,
    gender: "Male",
    bloodGroup: "B-",
  }),
];