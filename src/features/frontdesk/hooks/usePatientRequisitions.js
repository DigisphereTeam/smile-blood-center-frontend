import { useQuery } from "@tanstack/react-query";
import { getPatientRequisitions } from "../api/patientRequisitionApi";

export const usePatientRequisitions = () => {
  return useQuery({
    queryKey: ["patient-requisitions"],
    queryFn: getPatientRequisitions,
  });
};