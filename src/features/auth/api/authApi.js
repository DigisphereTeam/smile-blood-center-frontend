import axiosInstance from "../../../lib/axios";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
};

/**
 * Login User
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<Object>}
 */
export const login = async (credentials) => {
  const { data } = await axiosInstance.post(
    AUTH_ENDPOINTS.LOGIN,
    credentials
  );

  return data;
};