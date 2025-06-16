// components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/apiService';
import { Product } from '../types/apiTypes';
import ProductCard from '../component/Product/ProductCard';

import "./CatalogPage.css"

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchData();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Каталог товаров:</h2>
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className='product-list-items'>
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CatalogPage;