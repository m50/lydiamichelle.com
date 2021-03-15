import { useState, useEffect } from 'react';

interface Props<T extends object> {
  currentIdx: number;
  arr: T[];
  current: T;
  accessor: keyof T;
}

const usePrevNextLinks = <T extends object>(prefix: string, props: Props<T>) => {
  const { currentIdx, arr, current, accessor } = props;
  const [prevLink, setPrevLink] = useState<string>('');
  const [nextLink, setNextLink] = useState<string>('');

  useEffect(() => {
    if (arr.length === 0) {
      return;
    }
    let prev = currentIdx - 1;
    if (prev < 0) {
      prev = arr.length - 1;
    }
    let next = currentIdx + 1;
    if (next >= arr.length) {
      next = 0;
    }
    setPrevLink(`${prefix}/${arr[prev][accessor]}`);
    setNextLink(`${prefix}/${arr[next][accessor]}`);
  }, [current, arr, currentIdx]);

  return { prevLink, nextLink };
};

export default usePrevNextLinks;
