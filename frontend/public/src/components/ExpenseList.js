import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = ({ userId }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, [userId]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/api/expenses?userId=${userId}`);
      setExpenses(response.data);
      setFilteredExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleFilter = () => {
    let filtered = expenses;
    if (categoryFilter) {
      filtered = filtered.filter((expense) => expense.category === categoryFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter((expense) => expense.date.includes(dateFilter));
    }
    setFilteredExpenses(filtered);
  };

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleFilter} style={styles.button}>Apply Filters</button>
      </div>
      <ul style={styles.list}>
        {filteredExpenses.map((expense) => (
          <li key={expense._id} style={styles.listItem}>
            <span>Amount: ${expense.amount}</span>
            <span>Category: {expense.category}</span>
            <span>Date: {new Date(expense.date).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
};

export default ExpenseList;
