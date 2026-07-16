import { STORAGE_KEYS } from "../constants/storage";

export const storage = {
  getAccessToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),

  setAccessToken: (token) =>
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),

  removeAccessToken: () =>
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),

  clear: () => localStorage.clear(),
};