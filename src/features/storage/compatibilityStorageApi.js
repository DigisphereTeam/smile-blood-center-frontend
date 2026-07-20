const STORAGE_KEY = "compatibilityReports";

export const getCompatibilityReports = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
};

export const saveCompatibilityReport = (report) => {
  const reports = getCompatibilityReports();

  reports.unshift(report);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(reports)
  );
};

export const updateCompatibilityReport = (
  updatedReport
) => {
  const reports = getCompatibilityReports();

  const updatedReports = reports.map((report) =>
    report.id === updatedReport.id
      ? updatedReport
      : report
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedReports)
  );
};

export const deleteCompatibilityReport = (
  reportId
) => {
  const reports = getCompatibilityReports();

  const updatedReports = reports.filter(
    (report) => report.id !== reportId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedReports)
  );
};

export const getCompatibilityReportById = (
  id
) => {
  return getCompatibilityReports().find(
    (report) => report.id === id
  );
};

export const getCompatibilityReportByRequisitionId = (
  requisitionId
) => {
  return getCompatibilityReports().find(
    (report) =>
      report.requisitionId === requisitionId
  );
};

export const clearCompatibilityReports = () => {
  localStorage.removeItem(STORAGE_KEY);
};