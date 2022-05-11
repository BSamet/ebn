import React from 'react'
import QRCode from "qrcode.react";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import "../styles/component/_QrCodeGen.scss"
import Button from '@mui/material/Button';
const icon = require("../assets/cycle.png")

interface idConteneurInterface {
    selectConteneurId: string;
}


const RightSideQrcode = ({ selectConteneurId }: idConteneurInterface) => {
    const qrRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

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

    const handlePrint = useReactToPrint({
        content: () => qrRef.current,
        pageStyle:"@page { size: auto; margin: 25mm; } }"
    });

    if(selectConteneurId !== "") {
        return (
            <div className="qr-container"> 
                <div id="qr_code" className="qr-container__qr-code" ref={qrRef}>
                    <h2>Conteneur N° {selectConteneurId}</h2>
                    {qrCode}
                </div> 
                <button onClick={handlePrint}>Imprimer le QRCODE</button>                              
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