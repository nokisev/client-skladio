import React, { useState } from "react";
import { Product } from "../types/apiTypes";
import { addProduct } from "../services/apiService";

interface AddProductFormProps {
    onProductAdded: (newProduct: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({ article: '', name: '', description: '', product_unit: '', quantity: 0, price: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const newProduct = await addProduct(formData);
            onProductAdded(newProduct);
            setFormData({ article: '', name: '', description: '', product_unit: '', quantity: 0, price: 0 });
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
            <input 
            type="text"
            name="product_unit"
            value={formData.product_unit}
            onChange={handleChange}
            placeholder="Единица измерения"
            />
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

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add product"}
            </button>
        </form>
    );
};

export default AddProductForm;