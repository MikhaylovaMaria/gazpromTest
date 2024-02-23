import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

type FilteredDataItem = {
  date: string;
  month: string;
  indicator: string;
  value: number;
  id: string;
};

type MeanValueForCurrencyProps = {
  currencyId: number;
  filteredData: FilteredDataItem[];
};

const MeanValueForCurrency = ({
  currencyId,
  filteredData,
}: MeanValueForCurrencyProps) => {
  const [meanValue, setMeanValue] = useState<string | null>(null);

  // отслеживание среднего значения при изменении валюты или отфильтрованных данных
  useEffect(() => {
    const { length } = filteredData;
    const averageValue =
      length > 0
        ? (
            filteredData.reduce((acc, elem) => acc + elem?.value, 0) / length
          ).toFixed(1)
        : '0';
    const formatter = new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 1,
    });
    setMeanValue(formatter.format(parseFloat(averageValue)));
  }, [currencyId, filteredData]);

  return (
    <>
      {meanValue && (
        <div className={styles.mean}>
          <p className={styles.pAverage}>Среднее за период</p>
          <p className={styles.pValue}>
            <span className={styles.spanValue}>{meanValue && meanValue}</span> ₽
          </p>
        </div>
      )}
    </>
  );
};

export default MeanValueForCurrency;
