import dayjs from "dayjs";

export const getInitialDonorFormData = () => ({
  donorId: "",
  unitNumber: "",

  donorName: "",
  age: "",
  gender: "",
  mobileNumber: "",

  bloodGroup: "",
  component: "",

  donationType: "VOLUNTARY",

  volume: "",
  weight: "",
  hemoglobin: "",
  bloodPressure: "",

  collectionDate: dayjs(),
  expiryDate: null,

  status: "AVAILABLE",
});