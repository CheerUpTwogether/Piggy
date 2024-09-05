import {useState, useEffect} from 'react';

const useIntervalValue = <T,>(
  initialValue: T,
  interval: number = 1000,
  updateValue: (value: T) => T,
) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue(prevValue => updateValue(prevValue));
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, updateValue]);

  return value;
};

export default useIntervalValue;
