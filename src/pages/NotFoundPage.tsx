import React from 'react';
import { Link } from 'react-router-dom';
import errorimg from '../404.jpg'

const NotFoundPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>404 - Page Not Found</h1>
      <img src={errorimg} alt="" />
      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;