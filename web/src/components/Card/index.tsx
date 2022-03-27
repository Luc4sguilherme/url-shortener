import './style.css';

import qrcode from 'qrcode';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { useCopy } from '../../contexts/copyContext';
import { useError } from '../../contexts/errorContext';
import api from '../../services/api';
import formatUrl from '../../util/formatURL';
import Modal from '../Modal';
import QRCode from '../QRCode';

const PORT = import.meta.env.DEV ? ':3000' : '';
const HOST = import.meta.env.DEV
  ? 'localhost'
  : formatUrl(import.meta.env.BASE_URL);

interface URL {
  full: string;
  user_id: string;
  short: string;
  clicks: number;
}

type CardProps = {
  short: string;
  full: string;
  clicks: number;
  urls: URL[];
  setUrls: React.Dispatch<React.SetStateAction<URL[]>>;
};

function Card({ short, full, clicks, urls, setUrls }: CardProps) {
  const { copy } = useCopy();
  const { setError } = useError();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleSaveFile(text: string) {
    try {
      const url = await qrcode.toDataURL(`${HOST}${PORT}/${text}`, {
        scale: 10,
      });
      const link = document.createElement('a');

      link.download = `qrcode-${text}.png`;
      link.href = url;
      link.click();
    } catch (error) {
      setError('There was an error generating the QR code');
    }
  }

  async function handleDelete(shortUrl: string) {
    try {
      await api.delete(`/${shortUrl}`);

      const newList = urls.filter(item => item.short !== shortUrl);

      setUrls(newList);
    } catch (error) {
      setError('There was an error deleting the link');
    }
  }

  return (
    <div className="card-wrapper">
      <div className="links">
        <div className="original-link">
          <p>{formatUrl(full)}</p>
        </div>
        <div className="short-link">
          <a
            href={short}
            target="_blank"
            rel="noreferrer"
          >{`${HOST}${PORT}/${short}`}</a>
        </div>
      </div>

      <div className="infos-wrapper">
        <span className="clicks-link">Clicks: {clicks}</span>
        <div className="controls-container">
          <button
            type="button"
            className="copy-link"
            onClick={() => {
              copy(`${HOST}${PORT}/${short}`);
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </button>

          <button type="button" className="stats-link" onClick={handleOpen}>
            <QrCode2Icon fontSize="small" />
          </button>

          <button
            type="button"
            className="delete-link"
            onClick={() => {
              handleDelete(short);
            }}
          >
            <DeleteIcon fontSize="small" />
          </button>

          <Modal open={open} handleClose={handleClose}>
            <QRCode text={`${HOST}${PORT}/${short}`} />

            <button
              type="button"
              onClick={handleClose}
              className="close-modal-btn"
            >
              <CloseIcon />
            </button>

            <button
              type="button"
              onClick={() => {
                handleSaveFile(short);
              }}
              className="save-file-btn"
            >
              Save
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Card;
