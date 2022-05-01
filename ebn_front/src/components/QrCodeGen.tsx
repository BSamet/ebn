import * as React from "react";
import QRCode from "qrcode.react";
import "../styles/component/_QrCodeGen.scss";

const icon = require("../assets/cycle.png");

export default function QrCode() {
  const qrRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [text, setText] = React.useState("");

  const downloadQRCode = (evt: React.FormEvent) => {
    evt.preventDefault();

    // let canvas = qrRef.current.querySelector("canvas");

    setText("");
  };

  const qrCode = (
    <QRCode
      size={500}
      value={text}
      bgColor="white"
      fgColor="black"
      level="H"
      imageSettings={{
        src: icon,
        excavate: true,
        width: 500 * 0.1,
        height: 500 * 0.1,
      }}
    />
  );
  return (
    <div className="qr-container">
      <form onSubmit={downloadQRCode} className="qr-container__form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="12345678"
        />

        <button type="submit">Imprimer le QR Code</button>
      </form>

      <div className="qr-container__qr-code" ref={qrRef}>
        {qrCode}
      </div>
    </div>
  );
}
