import React, { useEffect, useMemo, useState } from 'react';
import { Card } from '@consta/uikit/Card';
import ChartLine from '../ChartLine/ChartLine';
import MeanValueForCurrency from '../MeanValueForCurrency';
import styles from './index.module.css';
import ChoiceGroupCurrency from '../ChoiceGroupCurrency';
import { useData } from '../../services/DataContext';
import { currencies } from '../../data/data';

const CardWithChart = () => {
  type Item = string;
  type FilteredDataItem = {
    date: string;
    month: string;
    indicator: string;
    value: number;
    id: string;
  };
  type currentCurrencyItem = {
    id: number;
    indicator?: string;
    symbol?: string;
  };

  const items: Item[] = ['$', '€', '¥'];
  const [currency, setCurrency] = useState<Item>(items[0]);
  const [id, setId] = useState<number | null>(null);
  const { data } = useData();

  // Функция для нахождения ID валюты по её символу
  const findCurrencyIdBySymbol = (symbol: string): number => {
    const foundCurrency = currencies.find((item) => item.symbol === symbol);
    return foundCurrency?.id || 0;
  };
  // Мемоизированный ID текущей валюты
  const currencyId = useMemo(
    () => findCurrencyIdBySymbol(currency),
    [currency]
  );
  // Обновление ID текущей валюты при изменении
  useEffect(() => {
    setId(currencyId);
  }, [currencyId]);

  // Мемоизированный объект текущей валюты
  const currentCurrency = useMemo(() => {
    const foundCurrency = currencies.find((elem) => elem.id === id);
    return foundCurrency ? foundCurrency : ({ id } as currentCurrencyItem);
  }, [id]);

  // Мемоизированный массив отфильтрованных данных для текущей валюты
  const filteredData = useMemo<FilteredDataItem[]>(() => {
    return data.filter((elem) => elem.indicator === currentCurrency?.indicator);
  }, [data, currentCurrency]);

  return (
    <Card className={styles.card}>
      <ChartLine
        filteredData={filteredData}
        currentCurrency={currentCurrency}
      />
      <div className={styles.container}>
        <ChoiceGroupCurrency
          value={currency}
          onChange={setCurrency}
        ></ChoiceGroupCurrency>
        <MeanValueForCurrency
          filteredData={filteredData}
          currencyId={currencyId}
        />
      </div>
    </Card>
  );
};

export default CardWithChart;
