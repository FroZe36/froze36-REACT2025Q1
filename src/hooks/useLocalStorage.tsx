import { useEffect, useState } from 'react';
type StorageDataType = string;

const isServer = typeof window === 'undefined';

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [storageData, setStorageData] = useState<StorageDataType>(() => {
    return isServer
      ? initialValue
      : (localStorage.getItem(key) ?? initialValue);
  });
  useEffect(() => {
    if (!isServer) {
      localStorage.setItem(key, storageData);
    }
  }, [key, storageData]);
  return [storageData, setStorageData] as const;
};
export default useLocalStorage;
