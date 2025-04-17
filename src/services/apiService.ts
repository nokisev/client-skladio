import axios from "axios";
import { Product } from "../types/apiTypes";

const API_BASE_URL = "http://localhost:8080"

export const fetchData = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;       
    }
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    try {
        const response = await axios.post<Product>(`${API_BASE_URL}/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product: ', error);
        throw error;        
    }
};

