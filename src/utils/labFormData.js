import dayjs from "dayjs";

export const getInitialLabFormData = (patient) => ({
  // Blood Grouping
  confirmedABOGroup:
    patient?.lab?.bloodGrouping?.confirmedABOGroup || "",

  confirmedRhType:
    patient?.lab?.bloodGrouping?.confirmedRhType || "",

  // Donor Details
  unitNumber:
    patient?.lab?.donorDetails?.unitNo || "",

  donorBloodGroup:
    patient?.lab?.donorDetails?.bloodGroup || "",

  collectionDate:
    patient?.lab?.donorDetails?.collectionDate
      ? dayjs(patient.lab.donorDetails.collectionDate)
      : null,

  expiryDate:
    patient?.lab?.donorDetails?.expiryDate
      ? dayjs(patient.lab.donorDetails.expiryDate)
      : null,

  component:
    patient?.lab?.donorDetails?.component || "",

  volume:
    patient?.lab?.donorDetails?.volume || "",

  viralScreening:
    patient?.lab?.donorDetails?.viralScreening || "",

  // Cross Matching
  crossMatchBloodGroup:
    patient?.lab?.crossMatching?.bloodGroup || "",

  donorComponent:
    patient?.lab?.crossMatching?.donorComponent || "",

  crossCollectionDate:
    patient?.lab?.crossMatching?.collectionDate
      ? dayjs(patient.lab.crossMatching.collectionDate)
      : null,

  crossExpiryDate:
    patient?.lab?.crossMatching?.expiryDate
      ? dayjs(patient.lab.crossMatching.expiryDate)
      : null,

  issueNumber:
    patient?.lab?.crossMatching?.issueNumber || "",

  crossMatchResult:
    patient?.lab?.crossMatching?.crossMatchingResult || "",
});