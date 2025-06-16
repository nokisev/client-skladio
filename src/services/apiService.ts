import axios from "axios";
import { Product } from "../types/apiTypes";

const API_BASE_URL = "http://79.174.80.198:8080/api"

export const fetchData = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;       
    }
};

export const fetchDataById = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch(error) {
        console.error('Product not found');
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

export const updateProduct = async (productData: Product): Promise<Product> => {
    try {
        const response = await axios.put<Product>(`${API_BASE_URL}/products/${productData.id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product: ', error);
        throw error;
    }
}

export const deleteProduct = async (id: bigint): Promise<void> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
    } catch (error) {
        console.error('Error deleting product: ', error);
        throw error;
    }
}

