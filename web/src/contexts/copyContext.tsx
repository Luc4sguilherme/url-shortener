import copyToClipboard from 'copy-to-clipboard';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface CopyContextData {
  copied: boolean;
  copy: (text: string) => void;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
}

type CopyProviderProps = {
  children: JSX.Element;
};

const CopyContext = createContext<CopyContextData>({} as CopyContextData);

export function CopyProvider({ children }: CopyProviderProps) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    const copiedString = copyToClipboard(text);

    setCopied(copiedString);
  };

  useEffect(() => {
    const unregister = setTimeout(() => {
      setCopied(false);
    }, 2500);

    return () => {
      clearTimeout(unregister);
    };
  }, [copied]);

  const memoizedValue = useMemo(
    () => ({
      copied,
      copy,
      setCopied,
    }),
    [copied],
  );

  return (
    <CopyContext.Provider value={memoizedValue}>
      {children}
    </CopyContext.Provider>
  );
}

export function useCopy() {
  const context = useContext(CopyContext);
  return context;
}
