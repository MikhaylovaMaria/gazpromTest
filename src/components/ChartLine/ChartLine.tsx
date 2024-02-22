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
  const [min, max] = useMemo(() => {
    return filteredData.reduce(
      ([prevMin, prevMax], curr) => [
        Math.min(prevMin, curr.value),
        Math.max(prevMax, curr.value),
      ],
      [Infinity, -Infinity]
    );
  }, [filteredData]);

  const option = {
    color: '#f38b00',
    title: {
      text: `${currentCurrency?.indicator}, ${currentCurrency?.symbol}/₽`.toUpperCase(),
      textStyle: {
        fontSize: 20,
        color: 'black',
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    lineStyle: {
      type: 'dashed',
    },
    xAxis: {
      type: 'category',
      data: filteredData.map((elem) => elem.month),
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
    yAxis: {
      min: min,
      max: max,
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
    series: [
      {
        name: currentCurrency?.indicator,
        tooltip: {
          valueFormatter: (value: string) => value + '₽',
        },
        data: filteredData.map((elem) => [elem.month, elem.value]),
        type: 'line',
        showSymbol: false,
      },
    ],
  };
  return <ReactECharts style={{ padding: '0', margin: '0' }} option={option} />;
};

export default ChartLine;
