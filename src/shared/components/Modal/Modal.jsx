import React from 'react'
import { IoClose } from 'react-icons/io5';
import "./Modal.scss";

function Modal({ children, setModalVisible }) {
    return (
        <div className="modal">
            <IoClose className="close-button" onClick={() => setModalVisible(false)} />
            {children}
        </div>
    )
}

export default Modal