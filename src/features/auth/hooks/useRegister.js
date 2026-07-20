import { useMutation } from "@tanstack/react-query";

import { signup } from "../api/authApi";

const useRegister = () => {
  return useMutation({
    mutationFn: signup,
  });
};

export default useRegister;