import React from 'react';
import { Product, Tag } from "../../types/apiTypes";
import { Link } from 'react-router-dom';
import AddToCartButton from '../Cart/AddToCartButton';

import "./ProductCard.css"

interface ProductItemProps {
    product: Product;
}
  const getTagDisplayName = (tag: Tag): string => {
    const tagNames: Record<Tag, string> = {
      [Tag.SPECIAL_PRICE]: 'SALES',
      [Tag.CUPS]: 'Чашки',
      [Tag.PLATES]: 'Тарелки',
      [Tag.TEAPOT]: 'Чайники',
      [Tag.TECH]: 'Техника'
    };
    return tagNames[tag] || tag;
  };

const ProductCard: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-item">
      {product.tags?.map((tag) => (
            <div className={tag+" tags"} key={tag}>{getTagDisplayName(tag)}</div>
            
          ))}
      <Link to={"/products/"+product.id}>
          {product.picture && (
          <img src={product.picture} alt={product.name} width="300" />
        )}
        <h3>{product.name}</h3>
        <br />
        {product.price}₽
        
      </Link>
      <br />
      <AddToCartButton product={product} text={"Купить за " + product.price+"₽"} />
    </div>
  );
};

export default ProductCard;