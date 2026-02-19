import api from './api';

export interface House {
  id: number;
  address: string;
  price: number;
  status: 'available' | 'sold';
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}

export const getHouses = async (): Promise<House[]> => {
  try {
    const response = await api.get<House[]>('/houses');
    return response.data;
  } catch (error) {
    return [];
  }
};