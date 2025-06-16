import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { CartState, CartAction, CartItem } from '../types/cart';

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
          totalItems: state.totalItems + 1,
        };
      }

      const newItem: CartItem = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        quantity: 1,
      };

      return {
        ...state,
        items: [...state.items, newItem],
        total: state.total + action.payload.price,
        totalItems: state.totalItems + 1,
      };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find((item) => item.id === action.payload.id);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
        totalItems: state.totalItems - itemToRemove.quantity,
      };
    }

    case 'UPDATE_QUANTITY': {
      const itemToUpdate = state.items.find((item) => item.id === action.payload.id);
      if (!itemToUpdate) return state;

      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + itemToUpdate.price * quantityDiff,
        totalItems: state.totalItems + quantityDiff,
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        totalItems: 0,
      };

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    totalItems: 0,
  }, () => {
    // Инициализация из localStorage
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : {
        items: [],
        total: 0,
        totalItems: 0,
      };
    }
    return {
      items: [],
      total: 0,
      totalItems: 0,
    };
  });

  useEffect(() => {
    // Сохранение в localStorage при изменении
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};