import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>404 - Page Not Found</h1>
      <p>
        Return to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;