import React, { useState } from 'react';
import { createAccount } from '../api';

function AccountForm({ onAccountCreated }) {
  const [formData, setFormData] = useState({
    accountNumber: '',
    holderName: '',
    accountType: 'SAVINGS',
    balance: 0
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createAccount(formData);
      setMessage({ type: 'success', text: 'Account created successfully!' });
      setFormData({
        accountNumber: '',
        holderName: '',
        accountType: 'SAVINGS',
        balance: 0
      });
      
      if (onAccountCreated) {
        onAccountCreated();
      }
      
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error creating account. Please try again.' });
      console.error('Error creating account:', error);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'balance' ? parseFloat(value) : value
    });
  };

  return (
    <div className="account-form">
      <h2>Create New Account</h2>
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            placeholder="Enter account number"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="holderName">Account Holder Name:</label>
          <input
            type="text"
            id="holderName"
            name="holderName"
            value={formData.holderName}
            onChange={handleChange}
            required
            placeholder="Enter holder name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="accountType">Account Type:</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="SAVINGS">Savings</option>
            <option value="CHECKING">Checking</option>
            <option value="BUSINESS">Business</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="balance">Initial Balance:</label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <button type="submit" className="btn-submit">Create Account</button>
      </form>
    </div>
  );
}

export default AccountForm;
