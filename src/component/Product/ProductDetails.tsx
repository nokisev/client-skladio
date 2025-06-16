// components/ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataById } from '../../services/apiService';
import { Product } from '../../types/apiTypes';

import "./ProductDetails.css"
import AddToCartButton from '../Cart/AddToCartButton';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const productId = parseInt(id, 10);
        const data = await fetchDataById(productId);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <div className='product-details-left'>
        {product.picture && (
          <img src={product.picture} alt={product.name} width="300" />
        )}
      </div>
      <div className='product-details-right'>
        <div>
          {product.tags?.map((tag) => (
            <div className={tag+" tags"} key={tag}>{tag}</div>
          ))}
        </div>
        <h4>{product.name}</h4>
        <p>{product.price}₽</p>
        <h5>Описание</h5>
        <p>{product.description}</p>
        <AddToCartButton product={product} text='Добавить в корзину' />
      </div>
    </div>
  );
};

export default ProductDetails;