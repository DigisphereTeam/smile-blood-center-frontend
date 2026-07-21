import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatientRequisition } from "../api/patientRequisitionApi";

export const useUpdatePatientRequisition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      updatePatientRequisition(id, formData),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["patient-requisitions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["patient-requisition", id],
      });
    },
  });
};