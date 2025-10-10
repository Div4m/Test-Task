import axios from "axios";
import { SignupData } from "../types/userType";

const API_URL = "http://localhost:5000/api/users";

export const signupUser = (data: SignupData) => {
  return axios.post(`${API_URL}/signup`, data);
};