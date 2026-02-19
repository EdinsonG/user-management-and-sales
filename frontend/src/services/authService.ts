import api from "./api.ts";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};

export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Error en el registro';
    throw errorMessage;
  }
};