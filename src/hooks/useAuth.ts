import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  LoginParams,
  register,
  RegisterParams,
} from "../services/authApi";
import toast from "react-hot-toast";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, fullName, email, phone, password }: RegisterParams) =>
      register({ id, fullName, email, phone, password }),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account created successfully");
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
