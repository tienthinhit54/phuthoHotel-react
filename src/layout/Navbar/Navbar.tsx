import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../../shared/images/logo.png'
import '../../styles/navbar.css'
const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/home`);
  }

  const handleRoomClick = () => {
    navigate(`/room`);
  }

  const handleMassageClick = () => {
    navigate(`/massage`);
  }

  const handleServiceClick = () => {
    navigate(`/service`);
  }

  const handleContactClick = () => {
    navigate(`/contact`);
  }

  return (
    <nav className='NavbarItem'>
      <div className='nav'>
        <span className='home' onClick={handleHomeClick}>TRANG CHỦ</span>
        <span className='room' onClick={handleRoomClick}>PHÒNG NGHỈ</span>
        <img src={logo} alt='logo' className='nav-logo' />
        <span className='massage' onClick={handleMassageClick}>MASSAGE</span>
        <span className='service' onClick={handleServiceClick}>CÁC DỊCH VỤ KHÁC</span>
        <span className='contact' onClick={handleContactClick}>LIÊN HỆ</span>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </nav>
  );
};

export default Navbar;
