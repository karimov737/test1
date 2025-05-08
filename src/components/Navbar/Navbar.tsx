import React, { useState, useRef, useEffect } from 'react';
import logo from '../../assets/img/logo.png';
import icon from '../../assets/img/Icon.png';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+998');
  const [authStep, setAuthStep] = useState<'phone' | 'code'>('phone'); // Этап авторизации
  const [verificationCode, setVerificationCode] = useState(''); // Код подтверждения
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
    setAuthStep('phone'); // Сбросить этап авторизации
    setPhoneNumber('+998'); // Сбросить номер телефона
    setVerificationCode(''); // Сбросить код подтверждения
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/[^\d]/g, '');
    if (!cleaned.startsWith('998')) {
      return '+998';
    }
    const part1 = cleaned.slice(0, 3);
    const part2 = cleaned.slice(3, 5);
    const part3 = cleaned.slice(5, 8);
    const part4 = cleaned.slice(8, 10);
    const part5 = cleaned.slice(10, 12);
    let formatted = `+${part1}`;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += ` ${part3}`;
    if (part4) formatted += `-${part4}`;
    if (part5) formatted += `-${part5}`;
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (authStep === 'phone') {
      setPhoneNumber(formatPhoneNumber(value));
    } else {
      setVerificationCode(value);
    }
  };

  const handleSendPhoneNumber = () => {
    // Отправить номер телефона на сервер
    console.log('Отправка номера телефона:', phoneNumber);
    setAuthStep('code'); // Перейти к этапу ввода кода
  };

  const handleVerifyCode = () => {
    // Отправить код подтверждения на сервер
    console.log('Проверка кода подтверждения:', verificationCode);
    togglePopup(); // Закрыть попап после успешной авторизации
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      togglePopup();
    }
  };

  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupVisible]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/"><img src={logo} alt="Uztelecom Logo" /></a>
        </div>
        <ul className="navbar-links">
          <li><a href="#internet">Интернет</a></li>
          <li><a href="#business">Для Бизнеса</a></li>
          <li><a href="#advertisers">Для рекламодателей</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
        <div className="navbar-actions">
          <button className="personal-cabinet" onClick={togglePopup}>
            Личный кабинет
          </button>
          <div className="language">
            <img src={icon} alt="Language Icon" />
            <span className="ru">RU</span>
            <span className="uz">UZ</span>
          </div>
        </div>
      </nav>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup" ref={popupRef}>
            <button className="popup-close" onClick={togglePopup}>
              &times;
            </button>
            {authStep === 'phone' ? (
              <>
                <h2>Введите свой номер телефона</h2>
                <p>Для входа в личный кабинет введите свой номер телефона</p>
                <div className="phone-input">
                  <input
                    ref={inputRef}
                    type="text"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    maxLength={17}
                  />
                </div>
                <button className="popup-submit" onClick={handleSendPhoneNumber}>
                  Отправить
                </button>
              </>
            ) : (
              <>
                <h2>Введите код подтверждения</h2>
                <p>Мы отправили код на ваш номер телефона</p>
                <div className="phone-input">
                  <input
                    ref={inputRef}
                    type="text"
                    value={verificationCode}
                    onChange={handleInputChange}
                    maxLength={6} // Код подтверждения из 6 символов
                  />
                </div>
                <button className="popup-submit" onClick={handleVerifyCode}>
                  Подтвердить
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;