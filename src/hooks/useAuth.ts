import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  LoginParams,
  register,
  RegisterParams,
} from "../services/authApi";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fullName, email, phone, password }: RegisterParams) =>
      register({ fullName, email, phone, password }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("User Registered", user);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      login({ email, password }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("User Logedin", user);
    },
  });
}
