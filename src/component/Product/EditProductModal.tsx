import React, { useEffect, useState } from "react";
import { Product, Tag } from "../../types/apiTypes";

import "./EditProductModal.css";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSubmit: (updatedProduct: Product) => Promise<void>;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ 
  product, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
    tags: product.tags ? [...product.tags] : [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' 
        ? Number(value) 
        : value
    }));
  };

  const handleTagToggle = (tag: Tag) => {
    setFormData(prev => {
      const currentTags = prev.tags || [];
      const newTags = currentTags.includes(tag)
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag];
      
      return {
        ...prev,
        tags: newTags,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Редактирование продукта</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Артикул:</label>
            <input
              type="text"
              name="article"
              value={formData.article}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Наименование:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Описание:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Единица измерения:</label>
            <select
              name="product_unit"
              value={formData.product_unit}
              onChange={handleChange}
              required
            >
              <option value="шт">Штуки</option>
              <option value="кг">Килограммы</option>
              <option value="л">Литры</option>
              <option value="уп">Упаковки</option>
            </select>
          </div>

          <div className="form-group">
            <label>Количество:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Цена:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Ссылка на изображение:</label>
            <input
              type="string"
              name="picture"
              value={formData.picture}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Теги:</label>
            <div className="tags-container">
              {Object.values(Tag).map(tag => (
                <div
                  key={tag}
                  className={`tag ${formData.tags?.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {getTagDisplayName(tag)}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default EditProductModal;