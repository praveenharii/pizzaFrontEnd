import React from "react";
import ReactModal from "react-modal";
import QRCode from "qrcode.react";

const Modal = ({ isOpen, onRequestClose, mfaSecret }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="QR Code Modal"
    >
      {mfaSecret && (
        <div>
          <QRCode value={mfaSecret} />
          <p>
            Scan the QR code using your authenticator appor enter the following
            key manually: {mfaSecret}
          </p>
        </div>
      )}
    </ReactModal>
  );
};

export default Modal;
