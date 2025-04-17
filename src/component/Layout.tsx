import { Outlet, Link } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="app">
    <Header />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;