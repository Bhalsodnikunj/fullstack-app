import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    if (!title.trim()) return;
    const res = await axios.post(
      'http://localhost:5000/api/items',
      { title, description: desc },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    setItems([...items, res.data]);
    setTitle('');
    setDesc('');
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/items/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setItems(items.filter(i => i._id !== id));
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h2>Your Items</h2>
      <div className="item-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Item title" />
        <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
        <button onClick={handleAdd}>Add</button>
        <button onClick={logout}>Logout</button>
      </div>
      <ul className="item-list">
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.title}</strong>: {item.description}
            <button onClick={() => handleDelete(item._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
