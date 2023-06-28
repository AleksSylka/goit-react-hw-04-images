import { Overlay, Modal } from "components/Modal/Modal.styled";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = (props) => {

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },)

    const handleKeyDown = e => {
            if (e.code === 'Escape') {
                props.onClose();
            }
    }
    
    const handleOverlay = e => {
        if (e.currentTarget === e.target) {
            props.onClose()
        }
    }

    return createPortal(<Overlay onClick={handleOverlay}>
            <Modal>
                {props.children}
            </Modal>
        </Overlay>, modalRoot)
}
                