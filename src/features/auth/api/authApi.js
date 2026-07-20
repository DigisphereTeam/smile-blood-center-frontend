import axiosInstance from "../../../lib/axios";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup"
};

export const login = async (credentials) => {
  const { data } = await axiosInstance.post(
    AUTH_ENDPOINTS.LOGIN,
    credentials
  );

  return data;
};

export const signup = async (userData) => {
  const { data } = await axiosInstance.post(
    AUTH_ENDPOINTS.SIGNUP,
    userData
  );

  return data;
};