import React from "react";

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastNotification({ text, show, setShow, isError }) {
    return (
        <ToastContainer className="p-3 text-center w-auto" position="top-end" style={{ zIndex: 1 }}>
            <Toast
                animation={true}
                bg={isError ? "danger" : "success"}
                onClose={() => setShow(false)}
                show={show}
                delay={4000}
                autohide={true}
            >
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Message</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body as="div" className="text-light mr-auto">{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastNotification;