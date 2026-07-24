import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";


const DONOR_ENDPOINTS = {
  LIST: "/donors",
  DETAILS: (id) => `/donor/${id}`,
};

// Get All Donors

export const getDonors = async () => {
  const { data } = await axiosInstance.get(
    DONOR_ENDPOINTS.LIST
  );

  return data;
};

export const useDonors = () => {
  return useQuery({
    queryKey: ["donors"],
    queryFn: getDonors,
  });
};


// Get Donor By Id


export const getDonorById = async (id) => {
  const { data } = await axiosInstance.get(
    DONOR_ENDPOINTS.DETAILS(id)
  );

  return data;
};

export const useDonor = (id) => {
  return useQuery({
    queryKey: ["donor", id],
    queryFn: () => getDonorById(id),
    enabled: !!id,
  });
};