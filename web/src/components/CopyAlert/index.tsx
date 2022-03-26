import Alert from '@mui/material/Alert';

import { useCopy } from '../../contexts/copyContext';

import './style.css';

type CopyAlertProps = {
  children: JSX.Element;
};

function CopyAlert({ children }: CopyAlertProps) {
  const { copied } = useCopy();

  return (
    <>
      {copied ? (
        <Alert severity="success" className="alert-message">
          Link Copied
        </Alert>
      ) : (
        ''
      )}
      {children}
    </>
  );
}

export default CopyAlert;
