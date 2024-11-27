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
    mutationFn: ({ fullName, email, phone, password }: RegisterParams) =>
      register({ fullName, email, phone, password }),
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
      toast.success("Logged in successfully");
      console.log("User Logedin", user);
    },
    onError(error, variables, context) {
      toast.error("Error");
      console.log(error);
      console.log(variables);
      console.log(context);
    },
  });
}
