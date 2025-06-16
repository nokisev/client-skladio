import React from 'react';
import { CartItem} from '../../types/cart';
import { useCart } from '../../context/CartContext';

import "./CartItems.css"

interface CartItemProps {
  item: CartItem;
}

const CartItems: React.FC<CartItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleIncrease = () => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: item.id, quantity: item.quantity - 1 },
      });
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
  };

  return (
    <div className='cart-item-container'>
      <div className="cart-item">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="cart-item-picture"
        />
      )}
      <div className="">
        
        <div className="">
          
          <h3 className="">{item.name}</h3>
          <span className="">Количество: {item.quantity}</span>
          
          
        </div>
        <span className="">{(item.price * item.quantity)} ₽</span>
        <div className="">
          <div className="">
            <button
              onClick={handleDecrease}
              className=""
            >
              -
            </button>
            <button
              onClick={handleIncrease}
              className=""
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
            onClick={handleRemove}
            className="cart-item delete-btn"
          >
            ×
    </button>
    </div>
    
  );
};

export default CartItems;