import { useState, useEffect } from 'react';

const useDiscountModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modalTimestamp = localStorage.getItem('discountModalTimestamp');
    const now = new Date().getTime();
    const thirtyMinutes = 30 * 60 * 1000;

    if (!modalTimestamp || now - modalTimestamp > thirtyMinutes) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.setItem('discountModalTimestamp', new Date().getTime());
  };

  return [isModalOpen, closeModal];
};

export default useDiscountModal;