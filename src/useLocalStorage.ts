import { useState, useEffect, useCallback, useMemo } from 'react';
const useLocalStorage = <T = string>(key: string, initialValue: T[] = []) => {
  const [storageData, setStorageData] = useState<T[]>(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageData));
  }, [key, storageData]);

  const addItem = useCallback((item: T) => {
    setStorageData((prevData) => {
      if (prevData.includes(item)) {
        return prevData;
      }
      return [...prevData, item];
    });
  }, []);
  const memoizedStorageData = useMemo(() => storageData, [storageData]);

  return [memoizedStorageData, addItem] as const;
};

export default useLocalStorage;
