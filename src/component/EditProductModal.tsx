import React, { useEffect, useState } from "react";
import { Product } from "../types/apiTypes";

import "./EditProductModal.css";

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: (updatedProduct: Product) => Promise<void>;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState<Product>(product);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' || name === 'price' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Error saving product: ', error);            
        } finally {
            setIsSaving(false);
        }
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

          <div className="form-actions">
            <button type="button" onClick={onClose}>Отмена</button>
            <button type="submit" disabled={isSaving}>
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default EditProductModal;