import React from 'react'
import "./Modal.scss";
import { IoClose } from 'react-icons/io5';

function Modal({ children, setModalVisible }) {
    return (
        <div className="modal">
            <IoClose className="close-button" onClick={() => setModalVisible(false)} />
            {children}
        </div>
    )
}

export default Modal