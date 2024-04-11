import React from 'react';
import QRCode from 'qrcode.react';

const EmailQRCode = ({ email }) => {
  return <QRCode value={email} size={200} />;
};

export default EmailQRCode;