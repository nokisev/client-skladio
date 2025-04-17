import React from 'react'
import ProductTable from "../component/ProductTable"

const ProductsPage: React.FC = () => {
    return (
        <div className="page=container">
            <h1>Product Management</h1>
            <ProductTable />
        </div>
    )
}

export default ProductsPage;