import React from 'react';
import QRCode from 'react-qr-code';

function BarcodeCreator({ id, style }) {
    const defaultStyle = { width: '7rem ', height: '7rem' };

    return (
        <div>
            <QRCode value={id} style={style || defaultStyle} />
        </div>
    );
}

export default BarcodeCreator;
