import React from 'react';
import { Link } from 'react-router-dom';
import errorimg from '../logo_404.svg'

const NotFoundPage: React.FC = () => {
  return (
    <div className="page-container">
      <img src={errorimg} alt="" />
      <p>
        Вернуться к <Link to="/products">Товарам</Link>?
      </p>
    </div>
  );
};

export default NotFoundPage;