import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";


export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data; 
};

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(response.data, "hi");
    
    return response.data;
  };


export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};


export const getAuthToken = () => {
  return localStorage.getItem("token");
};


export const logout = () => {
    localStorage.removeItem("token"); 
    localStorage.clear(); 
    sessionStorage.clear(); 
    window.location.reload(); 
  };

