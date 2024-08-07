import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmationModal.scss';
import { hideModal } from '../../../store/slices/confirmationModalSlice';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
    const dispatch = useDispatch();
    const { isVisible, message, confirmText, cancelText } = useSelector((state) => state.modal);

    if (!isVisible) return null;

    return (
        <div className="confirmation-modal">
            <div className="confirmation-modal-content">
                <p>{message}</p>
                <div className="confirmation-modal-buttons">
                    <button onClick={() => { onConfirm(); dispatch(hideModal()); }}>
                        {confirmText}
                    </button>
                    <button onClick={() => { dispatch(hideModal()); }}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
