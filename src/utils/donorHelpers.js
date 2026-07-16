export const generateDonorId = (donors = []) => {
  const nextNumber = donors.length + 1;

  return `DNR-${new Date().getFullYear()}-${String(nextNumber).padStart(4, "0")}`;
};

export const generateUnitNumber = (donors = []) => {
  const nextNumber = donors.length + 1;

  return `UNIT-${new Date().getFullYear()}-${String(nextNumber).padStart(4, "0")}`;
};