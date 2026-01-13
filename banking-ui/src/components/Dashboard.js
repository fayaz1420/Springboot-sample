import React, { useState, useEffect } from 'react';
import { fetchAccounts } from '../api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalAccounts: 0,
    totalBalance: 0,
    averageBalance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetchAccounts();
      const accounts = response.data;
      
      const totalAccounts = accounts.length;
      const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
      const averageBalance = totalAccounts > 0 ? totalBalance / totalAccounts : 0;

      setStats({
        totalAccounts,
        totalBalance,
        averageBalance
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h2>Account Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Accounts</h3>
          <p className="stat-value">{stats.totalAccounts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p className="stat-value">${stats.totalBalance.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Balance</h3>
          <p className="stat-value">${stats.averageBalance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
