import React, { useState } from "react";
import { Product } from "../types/apiTypes";
import { addProduct } from "../services/apiService";

const DEFAULT_PICTURE = "https://i.pinimg.com/736x/9c/d7/82/9cd7827c61b7122b4accb7db67f80da1.jpg";

interface AddProductFormProps {
    onProductAdded: (newProduct: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({ article: '', name: '', description: '', product_unit: 'шт.', quantity: 0, price: 0, picture: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newProduct = await addProduct(formData);
            onProductAdded(newProduct);
            setFormData({ article: '', name: '', description: '', product_unit: '', quantity: 0, price: 1, picture: '' });
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <input 
            type="text"
            name="article"
            value={formData.article}
            onChange={handleChange}
            placeholder="Артикул"
            required
            />
            <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Наименование"
            required
            />
            <input 
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Описание"
            />
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
            <input 
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Количество"
            />
            <input 
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Цена"
            />
            <input 
            type="text"
            name="picture"
            value={formData.picture}
            onChange={handleChange}
            placeholder="Ссылка на изображение"
            />

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Добавление..." : "Добавить"}
            </button>
        </form>
    );
};

export default AddProductForm;