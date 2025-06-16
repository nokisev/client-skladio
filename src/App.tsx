// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import Header from './component/Header';
import './App.css';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetails from './component/Product/ProductDetails';
import CatalogPage from './pages/CatalogPage';
import Footer from './component/Footer';
import CartIcon from './component/Cart/CartIcon';
import { CartProvider } from './context/CartContext';
import Cart from './component/Cart/Cart';
import OrderTable from './component/Order/OrderTable';


const AppLayout: React.FC = () => {
  return (
    <CartProvider>
      <div className="app-container">
        <Header />
        <CartIcon /> 
        <div className="main-content-wrapper">
          <Sidebar />
          <div className="content-area">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/products' element={<CatalogPage />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/admin/orders' element={<OrderTable />} />
          <Route path='/admin/products' element={<ProductsPage />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;