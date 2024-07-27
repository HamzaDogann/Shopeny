import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const isAuthPage = ['/giris-yap', '/uye-ol', '/sifre-yenileme'].includes(location.pathname);

  if (isAuthPage) return null;

  return <div>{children}</div>;
};

export default Layout;