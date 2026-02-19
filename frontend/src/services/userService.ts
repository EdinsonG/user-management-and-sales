import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error: any) {
    return [];
  }
};

export const updateUser = async (id: number, data: { name: string; password?: string }) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Error al actualizar usuario";
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
     throw error.response?.data?.message || "Error al eliminar el usuario";
  }
};
