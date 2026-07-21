import dayjs from "dayjs";
import axiosInstance from "../../../lib/axios";
import { bloodComponents } from "../../../constants/frontdeskMockData";

const PATIENT_REQUISITION_ENDPOINTS = {
  GET_ALL: "/patient-requisitions",
  CREATE: "/patient-requisitions",
  GET_BY_ID: (id) => `/patient-requisitions/${id}`,
  UPDATE: (id) => `/patient-requisitions/${id}`,
};

const STATUS_MAP = {
  Pending: "Pending",
  Processing: "In Progress",
  Approved: "Completed",
};

const mapPatientRequisition = (item) => ({
  id: item.id,

  requisitionId: item.patient_id,
  patientName: item.patient_name,
  hospital: item.hospital_name,

  // Keep these separate for View/Edit pages
  bloodGroup: item.blood_group,
  rhType: item.rh_type,

  age: item.age,
  gender: item.gender,
  diagnosis: item.diagnosis,
  ipNumber: item.ip_number,
  referredBy: item.referred_by,
  wardNumber: item.ward_no,

  previousTransfusion: item.previous_transfusion,
  previousReaction: item.previous_transfusion_reaction,
  reactionDetails: item.previous_transfusion_reaction_details,

  status: STATUS_MAP[item.status] ?? item.status,
  isEmergency: item.is_emergency,

  requirementSelection: item.compatibility_test_type,
  physicianName: item.physician_name,
  emergencyDetails: item.emergency_details,

  createdAt: item.created_at,
  updatedAt: item.updated_at,

  createdBy: item.created_by,

  bloodComponents: item.components.map((component) => ({
    component: component.component_name,
    units: component.units_required,
    requiredDateTime: component.required_date_time,
    reserve: component.is_reserved ?? false,
  })),

  transfusionIndications: item.transfusion_indications,
});

export const getPatientRequisitions = async () => {
  const { data } = await axiosInstance.get(
    PATIENT_REQUISITION_ENDPOINTS.GET_ALL
  );

  return data.data.map(mapPatientRequisition);
};

export const getPatientRequisitionById = async (id) => {
  const { data } = await axiosInstance.get(
    PATIENT_REQUISITION_ENDPOINTS.GET_BY_ID(id)
  );

  return mapPatientRequisition(data.data);
};


const buildPatientRequisitionPayload = (formData) => {
  return {
    patient_name: formData.patientName,
    hospital_name: formData.hospital,
    blood_group: formData.bloodGroup,
    rh_type: formData.rhType,
    age: Number(formData.age),
    gender: formData.gender,
    diagnosis: formData.diagnosis,
    ip_number: formData.ipNumber,
    referred_by: formData.referredBy,
    ward_no: formData.wardNumber,

    previous_transfusion: formData.previousTransfusion,
    previous_transfusion_reaction: formData.previousReaction,
    previous_transfusion_reaction_details: formData.previousReaction
      ? formData.reactionDetails
      : null,

    transfusion_indications: Object.entries(formData.transfusionIndications)
      .filter(([, checked]) => checked)
      .map(([key]) => key),

    components: formData.bloodComponents
      .filter((component) => component.selected)
      .map((component) => ({
        component_id: bloodComponents.find(
          (item) => item.value === component.component
        )?.id,
        units_required: Number(component.units),
        required_date_time: dayjs(
          component.requiredDateTime
        ).toISOString(),
        is_reserved: component.reserve,
      })),

    is_emergency: formData.isEmergency,
    compatibility_test_type: formData.requirementSelection || null,
    physician_name: formData.physicianName || null,
    emergency_details: null,
  };
};

export const createPatientRequisition = async (formData) => {
  const { data } = await axiosInstance.post(
    PATIENT_REQUISITION_ENDPOINTS.CREATE,
    buildPatientRequisitionPayload(formData)
  );

  return data.data;
};

export const updatePatientRequisition = async (id, formData) => {
  const { data } = await axiosInstance.patch(
    PATIENT_REQUISITION_ENDPOINTS.UPDATE(id),
    buildPatientRequisitionPayload(formData)
  );

  return data.data;
};