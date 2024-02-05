import React, { useState, useEffect } from 'react'
import "./App.css";
function CurrencyInput({ amount, currency, currencies, onAmountChange, onCurrencyChange }) {
  return (
    <div className='wrapper'>
      <input
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput
