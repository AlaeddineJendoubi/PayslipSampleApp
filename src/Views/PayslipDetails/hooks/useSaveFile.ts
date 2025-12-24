import { useState } from 'react';
import FileSaverManager from '../../../services/fileSaver';

export const useSaveFile = (fileName: string) => {
  const [savedPath, setSavedPath] = useState('');
  const [error, setError] = useState<string>('');
  const handleSaveBundledFile = async () => {
    try {
      const path = await FileSaverManager.saveBundledFile(fileName);
      setSavedPath(path);
    } catch (err) {
      setError(String(err));
    }
  };

  return {
    handleSaveBundledFile,
    savedPath,
    error,
  };
};
