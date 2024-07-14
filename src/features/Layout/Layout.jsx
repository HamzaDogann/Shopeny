import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Aktif URL'nin 'giris-yap', 'uye-ol' veya 'sifre-yenileme' olup olmadığını kontrol et
  const isAuthPage = ['/giris-yap', '/uye-ol', '/sifre-yenileme'].includes(location.pathname);

  // Eğer bu sayfalardan biriyse null döndür
  if (isAuthPage) return null;

  return <div>{children}</div>;
};

export default Layout;