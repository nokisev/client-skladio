import React from 'react';
import "./Footer.css"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Skladio</h3>
        </div>
        <div className="footer-section">
          <h3>ДЛЯ КЛИЕНТОВ</h3>
          <ul>
            <li>Порядок доставки и приемки товаров</li>
            <li>Порядок возврата или обмена товара</li>
            <li>Оформить заказ</li>
            <li>Документы</li>
            <li>Промокоды и Купоны</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Контакты</h3>
          <ul>
            <li>Email: info@example.com</li>
            <li>Телефон: +7 (916) 207-12-62</li>
            <li>Адрес: г. Москва, ул. Примерная, 123</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} ИП Воронцовой. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;