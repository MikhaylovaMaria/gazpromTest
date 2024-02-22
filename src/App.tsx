import React from 'react';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import CardWithChart from './components/CardWithChart';

import './style.css';
import { DataProvider } from './services/DataContext';

function App() {
  return (
    <DataProvider>
      <Theme className="App" preset={presetGpnDefault}>
        <CardWithChart />
      </Theme>
    </DataProvider>
  );
}

export default App;
