import './style.css';

import qrcode from 'qrcode';
import { useEffect, useRef } from 'react';

import { useError } from '../../contexts/errorContext';

type QRCodeProps = {
  text: string;
};

function QRCode({ text }: QRCodeProps) {
  const { setError } = useError();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      qrcode.toCanvas(canvasRef.current, text, error => {
        if (error) {
          setError(error.message);
        }
      });
    }
  }, [text]);

  return (
    <div className="qrcode">
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
}

export default QRCode;
