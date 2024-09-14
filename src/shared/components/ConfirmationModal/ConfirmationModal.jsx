import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../store/slices/confirmationModalSlice";
import "./ConfirmationModal.scss";

const ConfirmationModal = ({ onConfirm }) => {
    const dispatch = useDispatch();
    const { isVisible, message, confirmText, cancelText } = useSelector((state) => state.modal);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            dispatch(hideModal());
        }
    }, [dispatch]);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

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
