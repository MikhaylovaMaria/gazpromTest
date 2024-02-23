import React, { useMemo } from 'react';
import { ReactECharts } from '../../Echarts/ReactECharts';

type FilteredDataItem = {
  date: string;
  month: string;
  indicator: string;
  value: number;
  id: string;
};

type ChartLineProps = {
  filteredData: FilteredDataItem[];
  currentCurrency: {
    id: number;
    indicator?: string;
    symbol?: string;
  };
};

const ChartLine = ({ filteredData, currentCurrency }: ChartLineProps) => {
  // Вычисляем минимальное и максимальное значение для корректного отображения на графике
  const [min, max] = useMemo(() => {
    return filteredData.reduce(
      ([prevMin, prevMax], curr) => [
        Math.min(prevMin, curr.value),
        Math.max(prevMax, curr.value),
      ],
      [Infinity, -Infinity]
    );
  }, [filteredData]);

  // Конфигурация для ECharts графика
  const option = {
    // Цвет линии графика
    color: '#f38b00',
    // Анимация
    animation: true,
    // Заголовок графика
    title: {
      text: `${currentCurrency?.indicator}, ${currentCurrency?.symbol}/₽`.toUpperCase(),
      textStyle: {
        fontSize: '20px',
        color: '#002033',
      },
    },
    // Всплывающие подсказки
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    // Стиль линии
    lineStyle: {
      type: 'solid',
    },
    // Ось X
    xAxis: {
      type: 'category',
      data: filteredData.map((dataItem) => dataItem.month),
      lineStyle: {
        type: 'dashed',
      },
      axisTick: {
        show: false,
      },
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: 30,
      },
    },
    // Ось Y
    yAxis: {
      min,
      max,
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
      axisLabel: {
        show: true,
      },
    },
    // Данные графика
    series: [
      {
        name: currentCurrency?.indicator,
        tooltip: {
          valueFormatter: (value: string) => value + '₽',
        },
        data: filteredData.map((dataItem) => [dataItem.month, dataItem.value]),
        type: 'line',
        showSymbol: false,
      },
    ],
  };
  return <ReactECharts style={{ padding: '0', margin: '0' }} option={option} />;
};

export default ChartLine;
