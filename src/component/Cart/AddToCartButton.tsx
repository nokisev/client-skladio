import React from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/apiTypes';

interface AddToCartButtonProps {
  product: Product;
  text: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, text }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.picture,
      },
    });
  };

  return (
    <button
      onClick={handleAddToCart}
    >
      {text}
    </button>
  );
};

export default AddToCartButton;