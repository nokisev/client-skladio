import React, { useEffect, useState } from 'react'
import ProductTable from "../component/ProductTable"
import { Product } from '../types/apiTypes';
import { fetchData, updateProduct } from '../services/apiService';

const ProductsPage: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchData();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки продуктов');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleProductDeleted = (deletedProductId: bigint) => {
    setProducts(prev => prev.filter(p => p.id !== deletedProductId));
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className="page=container">
            <h1>Product Management</h1>
            <ProductTable 
            products={products} 
            onProductUpdated={handleProductUpdated}
            onProductDeleted={handleProductDeleted}
            />
        </div>
    )
}

export default ProductsPage;
