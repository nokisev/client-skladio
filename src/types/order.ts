export interface Order {
  id?: bigint;
  orderDate?: Date;
  orderNumber?: string;
  customer: string;
  email: string;
  address: string;
  status?: OrderStatus;
  expectedDeliveryDate?: Date;
  totalAmount: number;
  notes?: string;
  orderItems: OrderItem[];
}

export enum OrderStatus {
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

export interface OrderItem {
  id?: bigint;
  productId: bigint;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
}