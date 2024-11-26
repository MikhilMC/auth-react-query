import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export type RegisterParams = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export async function register({
  fullName,
  email,
  phone,
  password,
}: RegisterParams) {
  return (
    await axiosInstance.post("/register", {
      fullName,
      email,
      phone,
      password,
      isAdmin: true,
    })
  ).data;
}

export async function login({ email, password }: LoginParams) {
  return (await axiosInstance.post("/login", { email, password })).data;
}
