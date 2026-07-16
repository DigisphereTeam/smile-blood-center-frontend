import dayjs from "dayjs";

const STORAGE_KEY = "blood-centre-donors";

// ---------------------------
// Get All Donors
// ---------------------------
export const getDonors = () => {
  const donors = localStorage.getItem(STORAGE_KEY);

  return donors ? JSON.parse(donors) : [];
};

// ---------------------------
// Generate Donor ID
// ---------------------------
export const generateDonorId = () => {
  const donors = getDonors();

  const nextNumber = donors.length + 1;

  return `DNR-2026-${String(nextNumber).padStart(4, "0")}`;
};

// ---------------------------
// Generate Unit Number
// ---------------------------
export const generateUnitNumber = () => {
  const donors = getDonors();

  const nextNumber = donors.length + 1;

  return `UNIT-2026-${String(nextNumber).padStart(4, "0")}`;
};

// ---------------------------
// Save New Donor
// ---------------------------
export const addDonor = (donor) => {
  const donors = getDonors();

  const updatedDonors = [
    {
      ...donor,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
    },
    ...donors,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedDonors)
  );

  return donor;
};

// ---------------------------
// Update Donor
// ---------------------------
export const updateDonor = (updatedDonor) => {
  const donors = getDonors();

  const updatedDonors = donors.map((donor) =>
    donor.donorId === updatedDonor.donorId
      ? {
          ...updatedDonor,
          updatedAt: dayjs().toISOString(),
        }
      : donor
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedDonors)
  );

  return updatedDonor;
};

// ---------------------------
// Delete Donor
// ---------------------------
export const deleteDonor = (donorId) => {
  const donors = getDonors();

  const updatedDonors = donors.filter(
    (donor) => donor.donorId !== donorId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedDonors)
  );
};

// ---------------------------
// Get Donor By ID
// ---------------------------
export const getDonorById = (donorId) => {
  return getDonors().find(
    (donor) => donor.donorId === donorId
  );
};

// ---------------------------
// Clear Storage (Development)
// ---------------------------
export const clearDonors = () => {
  localStorage.removeItem(STORAGE_KEY);
};