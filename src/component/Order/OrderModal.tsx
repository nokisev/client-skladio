import React, { useState } from 'react';
import { Order, OrderItem } from '../../types/order';
import { CartItem } from '../../types/cart';
import "../Product/EditProductModal.css";

interface OrderModalProps {
  cartItems: CartItem[];
  totalAmount: number;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id' | 'orderDate' | 'orderNumber' | 'status' | 'expectedDeliveryDate'>) => Promise<void>;
}

const OrderModal: React.FC<OrderModalProps> = ({ cartItems, totalAmount, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState({
    customer: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      customer: '',
      email: '',
      address: '',
    };

    if (!formData.customer.trim()) {
      newErrors.customer = 'Введите ФИО';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Введите адрес';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const orderItems: OrderItem[] = cartItems.map(item => ({
      productId: item.productId,
      productName: item.name,
      quantity: item.quantity,
      pricePerUnit: item.price,
      totalPrice: item.price * item.quantity,
    }));

    const order: Omit<Order, 'id' | 'orderDate' | 'orderNumber' | 'status' | 'expectedDeliveryDate'> = {
      customer: formData.customer,
      email: formData.email,
      address: formData.address,
      notes: formData.notes,
      totalAmount: totalAmount,
      orderItems: orderItems,
    };

    await onSubmit(order);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Оформление заказа</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ФИО*</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Иванов Иван Иванович"
              required
            />
            {errors.customer && <span className="error">{errors.customer}</span>}
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Адрес доставки*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Город, улица, дом, квартира"
              required
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>Примечания к заказу</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Дополнительная информация"
              rows={3}
            />
          </div>

          <div className="order-summary">
            <h3>Итого: {totalAmount.toFixed(2)} ₽</h3>
            <p>Товаров: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="submit-btn">
              Подтвердить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;