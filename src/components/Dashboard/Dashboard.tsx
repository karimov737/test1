import React from 'react';
import './Dashboard.scss';
import line from '../../assets/img/line.png';
const Dashboard: React.FC = () => {
  return (
    <><div className="main">
        <div className="clouds">
    <div className="cloud cloud-1"></div>
    <div className="cloud cloud-2"></div>
    <div className="cloud cloud-3"></div>
  </div>
      <div className="dashboard">
      <h1>
        Повысьте <strong>продуктивность</strong> вашей компании
      </h1>
      <p>
  <span >Услуги нашего оператора Wi-Fi могут стать отличным подспорьем </span>
  <span >для развития вашего бизнеса, поэтому свяжитесь c нами и</span>
  <span >получите множество наших предложений!</span>
</p>
      <button className="dashboard-button">Оставить заявку</button>
    </div>
    <div className="line">
      <img src={line} alt=""/></div></div></>
    
  );
};

export default Dashboard;