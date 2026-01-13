import React, { useState, useEffect } from 'react';
import { fetchAccounts, deleteAccount, updateAccount } from '../api';

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetchAccounts();
      setAccounts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load accounts. Make sure the backend is running.');
      console.error('Error loading accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccount(id);
        loadAccounts();
      } catch (err) {
        alert('Error deleting account');
        console.error('Error deleting account:', err);
      }
    }
  };

  const handleEdit = (account) => {
    setEditingId(account.id);
    setEditForm({ ...account });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleUpdate = async (id) => {
    try {
      await updateAccount(id, editForm);
      setEditingId(null);
      setEditForm({});
      loadAccounts();
    } catch (err) {
      alert('Error updating account');
      console.error('Error updating account:', err);
    }
  };

  if (loading) {
    return <div className="account-list loading">Loading accounts...</div>;
  }

  if (error) {
    return (
      <div className="account-list error">
        <p>{error}</p>
        <button onClick={loadAccounts}>Retry</button>
      </div>
    );
  }

  return (
    <div className="account-list">
      <h2>Accounts</h2>
      {accounts.length === 0 ? (
        <p className="no-accounts">No accounts found. Create one above!</p>
      ) : (
        <table className="accounts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account Number</th>
              <th>Holder Name</th>
              <th>Account Type</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(account => (
              <tr key={account.id}>
                {editingId === account.id ? (
                  <>
                    <td>{account.id}</td>
                    <td>
                      <input
                        type="text"
                        value={editForm.accountNumber || ''}
                        onChange={(e) => setEditForm({...editForm, accountNumber: e.target.value})}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editForm.holderName || ''}
                        onChange={(e) => setEditForm({...editForm, holderName: e.target.value})}
                      />
                    </td>
                    <td>
                      <select
                        value={editForm.accountType || ''}
                        onChange={(e) => setEditForm({...editForm, accountType: e.target.value})}
                      >
                        <option value="SAVINGS">Savings</option>
                        <option value="CHECKING">Checking</option>
                        <option value="BUSINESS">Business</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.balance || 0}
                        onChange={(e) => setEditForm({...editForm, balance: parseFloat(e.target.value)})}
                      />
                    </td>
                    <td>
                      <button className="btn-save" onClick={() => handleUpdate(account.id)}>Save</button>
                      <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{account.id}</td>
                    <td>{account.accountNumber}</td>
                    <td>{account.holderName}</td>
                    <td>{account.accountType}</td>
                    <td>${account.balance ? account.balance.toFixed(2) : '0.00'}</td>
                    <td>
                      <button className="btn-edit" onClick={() => handleEdit(account)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(account.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AccountList;
