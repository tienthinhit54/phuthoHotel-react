import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Layout;
