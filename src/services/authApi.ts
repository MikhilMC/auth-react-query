import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export type RegisterParams = {
  id: string;
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
  id,
  fullName,
  email,
  phone,
  password,
}: RegisterParams) {
  return (
    await axiosInstance.post("/register", {
      id,
      fullName,
      email,
      phone,
      password,
      isAdmin: false,
    })
  ).data;
}

export async function login({ email, password }: LoginParams) {
  return (await axiosInstance.post("/login", { email, password })).data;
}
