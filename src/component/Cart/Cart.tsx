import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartItems from './CartItems';
import OrderModal from '../Order/OrderModal';
import { Order } from '../../types/order';

import { createOrder } from '../../services/apiOrder'

const Cart: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { state: cartState, dispatch } = useCart();

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleOrderSubmit = async (orderData: Omit<Order, 'id' | 'orderDate' | 'orderNumber' | 'status' | 'expectedDeliveryDate'>) => {
    try {
      // Отправка данных на бэкенд
      const response = await createOrder(orderData);
      
      // Очистка корзины после успешного заказа
      dispatch({ type: 'CLEAR_CART' });
      
      // Перенаправление на страницу подтверждения
      // navigate(`/order-confirmation/${response.id}`);
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  return (
    <div className="">
      <div className="">
        <h2 className="">Корзина</h2>
        {cartState.items.length > 0 && (
          <button
            onClick={handleClearCart}
            className=""
          >
            Очистить корзину
          </button>
        )}
      </div>

      {cartState.items.length === 0 ? (
        <p className="">Ваша корзина пуста</p>
      ) : (
        <>
          <div className="">
            {cartState.items.map((item) => (
              <CartItems key={item.id} item={item} />
            ))}
          </div>
          
          <div className="">
            <div className="">
              <span>Итого:</span>
              <span>{cartState.total}₽</span>
            </div>
            <button onClick={() => setIsOrderModalOpen(true)}>
        Оформить заказ
      </button>
      
      {isOrderModalOpen && (
        <OrderModal
          cartItems={cartState.items}
          totalAmount={cartState.total}
          onClose={() => setIsOrderModalOpen(false)}
          onSubmit={handleOrderSubmit}
        />
      )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

