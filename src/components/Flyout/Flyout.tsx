import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  removeAllStarships,
  selectAllStarships,
  selectTotalStarships,
} from '../../redux/selectedStarshipsSlice';
import { StarshipShortProperties } from '../../types/types';
import styles from './Flyout.module.scss';

interface linkData {
  filename: string;
  url: string;
}

const { containerFlyout, actionContainerFlyout } = styles;

const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedStarshipsLength = useAppSelector((state) =>
    selectTotalStarships(state)
  );
  const selectedStarships = useAppSelector((state) =>
    selectAllStarships(state)
  );
  const [linkData, setLinkData] = useState<linkData>({ filename: '', url: '' });

  useEffect(() => {
    let url: string;
    function convertToCSV(data: StarshipShortProperties[]) {
      const headers = Object.keys(data[0]);
      const rows = data.map((item) =>
        headers
          .map((header) => `"${item[header as keyof StarshipShortProperties]}"`)
          .join(',')
      );
      return [headers.join(','), ...rows].join('\n');
    }
    function downloadCSV(data: StarshipShortProperties[], length: number) {
      const csvString = convertToCSV(data);
      const filename = `${length}_starships.csv`;
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
      if (url) {
        URL.revokeObjectURL(url);
      }
      url = URL.createObjectURL(blob);
      setLinkData({ url: url, filename: filename });
    }
    downloadCSV(selectedStarships, selectedStarshipsLength);

    return () => URL.revokeObjectURL(url);
  }, [selectedStarships, selectedStarshipsLength]);
  function handleReset() {
    dispatch(removeAllStarships());
  }

  return (
    <div className={containerFlyout} data-testid="flyout">
      <h2 className="text__primary">{`${selectedStarshipsLength} items selected`}</h2>
      <div className={actionContainerFlyout}>
        <button onClick={handleReset} type="button">
          Unselect All
        </button>
        <a download={linkData.filename} href={linkData.url}>
          <button type="button">Download</button>
        </a>
      </div>
    </div>
  );
};

export default Flyout;
