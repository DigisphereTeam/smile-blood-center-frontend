import { useQuery } from "@tanstack/react-query";
import { getPatientRequisitionById } from "../api/patientRequisitionApi";

export const usePatientRequisition = (id) => {
  return useQuery({
    queryKey: ["patient-requisition", id],
    queryFn: () => getPatientRequisitionById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};