import axios from "axios";
import { Order } from "../types/order";

const API_BASE_URL = "http://79.174.80.198:8080/api/orders";

export const createOrder = async (
  orderData: Omit<Order, 'id' | 'orderDate' | 'orderNumber' | 'status' | 'expectedDeliveryDate'>
): Promise<Order> => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, orderData);
        return response.data;
    }catch(error) {
        console.error(error);
        throw error;
    }
};

export const getAllOrders = async ()
: Promise<Order[]> => {
    try {
      const response = await axios.get<Order[]>(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error(error);
        throw error;
    }
};
