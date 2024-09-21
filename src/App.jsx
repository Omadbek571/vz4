import React, { useState, useEffect } from 'react';
import './index.css';
import Card from './components/Card';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [lang, setLang] = useState([]);
  const [users, setUsers] = useState([]);
  const [desc, setDesc] = useState('');

  function handleRegister(event) {
    event.preventDefault();

    const user = {
      id: Date.now(),
      username,
      email,
      lang,
      desc,
    };

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    setUsername('');
    setEmail('');
    setLang([]);
    setDesc('');

    let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));
  }

  function handleLang(event) {
    const { value, checked } = event.target;
    setLang(prevLang => 
      checked ? [...prevLang, value] : prevLang.filter(lang => lang !== value)
    );
  }

  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedItem);
  }, []);

  function handleDelete(id) {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }

  return (
    <div className="card">
      <form className='form' onSubmit={handleRegister}>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
          placeholder='Enter Username...' 
        />
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          placeholder='Enter Email...' 
        />
        <textarea 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          placeholder='Enter desc...' 
        />

        <div className='languages'>
          <input type="checkbox" id='uzbek' value="uzbek" onChange={handleLang} />
          <label htmlFor="uzbek">Uzbek</label> <br />
          <input type="checkbox" id='russian' value="russian" onChange={handleLang} />
          <label htmlFor="russian">Russian</label> <br />
          <input type="checkbox" id='english' value="english" onChange={handleLang} />
          <label htmlFor="english">English</label> <br />
        </div>

        <button type="submit">REGISTER</button>
      </form>

      <div className="wrapper">
        {users.length > 0 && users.map((user) => (
          <Card deleteItem={handleDelete} user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

export default App;
