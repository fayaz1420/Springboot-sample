import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AccountList from './components/AccountList';
import AccountForm from './components/AccountForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAccountCreated = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🏦 Banking Dashboard</h1>
      </header>
      <div className="container">
        <Dashboard />
        <AccountForm onAccountCreated={handleAccountCreated} />
        <AccountList key={refreshKey} />
      </div>
    </div>
  );
}

export default App;
