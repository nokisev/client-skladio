import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './component/Header';
import ProductTable from './component/ProductTable';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import Layout from './component/Layout';
import NotFoundPage from './pages/NotFoundPage';
import Sidebar from './component/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Layout />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
