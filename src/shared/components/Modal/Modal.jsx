import React, { useEffect, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';
import './Modal.scss';

function Modal({ children, setModalVisible }) {

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            setModalVisible(false);
        }
    }, [setModalVisible]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="modal">
            <IoClose className="close-button" onClick={() => setModalVisible(false)} />
            {children}
        </div>
    );
}

export default Modal;
