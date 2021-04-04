import { useEffect, useState } from 'react';
import { isSeries, Series } from 'collections/series/Series';
import { url } from 'pages/api/insta';

const useInstagram = (initSeries: Series) => {
  const [series, setSeries] = useState<Series>(initSeries);

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        if (!isSeries(data)) {
          return;
        }
        setSeries(data);
      });
  }, []);

  return series;
};

export default useInstagram;
