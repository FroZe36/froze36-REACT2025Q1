import { useEffect, useState } from 'react';
type StorageDataType = string;

const useLocalStorage = (key: string, initialValue: string = '') => {
  const [storageData, setStorageData] = useState<StorageDataType>(() => {
    return localStorage.getItem(key) ?? initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, storageData);
  }, [key, storageData]);
  return [storageData, setStorageData] as const;
};
export default useLocalStorage;
