import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatientRequisition } from "../api/patientRequisitionApi";

export const useCreatePatientRequisition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatientRequisition,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient-requisitions"],
      });
    },
  });
};