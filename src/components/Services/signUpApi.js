
import axios from "axios";

const API_URL = "http://localhost:5000/api";


export const registerUser = async (username, password, email) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    username,
    password,
    email,
  });
  return response.data;
};