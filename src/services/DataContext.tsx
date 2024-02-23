import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import api from '../data/data';

interface DataItem {
  date: string;
  month: string;
  indicator: string;
  value: number;
  id: string;
}

type DataContextType = {
  data: any[];
  loading: boolean;
  error: Error | null;
};
// Создание контекста данных
const DataContext = createContext<DataContextType | undefined>({
  data: [] as DataItem[],
  loading: true,
  error: null,
});

// Определение типа свойств провайдера данных
type DataProviderProps = {
  children: ReactNode;
};

// Компонент-провайдер данных
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // получение данных при монтировании компонента
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await api.dataAll();
        setData(result);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Кастомный хук для удобного использования данных из контекста
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
