import React from 'react'
import QRCode from "qrcode.react";
import "../styles/component/_QrCodeGen.scss"
const icon = require("../assets/cycle.png")

interface idConteneurInterface {
    selectConteneurId: string;
}


const RightSideQrcode = ({ selectConteneurId }: idConteneurInterface) => {
    const qrRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const [text, setText] = React.useState("");

    const printQRCode = (evt: React.FormEvent) => {
        evt.preventDefault();
        setText("");
    };

    const qrCode = (
        <QRCode
            size={250}
            value={"" + selectConteneurId}
            bgColor="white"
            fgColor="black"
            level="H"
            imageSettings={{
                src: icon,
                excavate: true,
                width: 250 * 0.1,
                height: 250 * 0.1
            }}
        />
    )

    if(selectConteneurId !== "") {
        return (
            <div className="qr-container">
                {selectConteneurId}
                <form onSubmit={printQRCode} className="qr-container__form">
    
                    <button type="submit">Imprimer le QR Code</button>
                </form>
    
                <div className="qr-container__qr-code" ref={qrRef}>
                    {qrCode}
                </div>
            </div>
        );
    } else {
        return (
            <div className="qr-container">
                <h1>Veuillez séléctionnez un conteneur</h1>
            </div>
        )
    }
}
export default RightSideQrcode