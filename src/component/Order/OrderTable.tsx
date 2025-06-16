import React, { useEffect, useState } from 'react'
import { Order } from '../../types/order'
import { getAllOrders } from '../../services/apiOrder';
import { fetchDataById } from '../../services/apiService';


const OrderTable: React.FC = () => {
    const [orders, setOrder] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getAllOrders();
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className='product-table-section'>

            <table className='product-table'>
                <caption className='product-table-name'>
                    <h2>skladio orders list <br /></h2>
                </caption>
                <thead className='product-table-header'>
                    <tr>
                        <th>Номер заказа</th>
                        <th>Клиент</th>
                        <th>email</th>
                        <th>Адрес</th>
                        <th>Статус заказа</th>
                        <th>Итоговая цена</th>
                        <th>Дополнительная информация</th>
                        <th>Количество товаров</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>

                            <td>{order.orderNumber}</td>
                            <td>{order.customer}</td>
                            <td>{order.email}</td>
                            <td>{order.address}</td>
                            <td>{order.status}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.notes}</td>
                            <td>{order.orderItems.length}</td>                      
                        </tr>
                    ))}
                </tbody>
            </table>            
        </div>
    );
};

export default OrderTable;
