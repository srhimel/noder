import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const nameRef = useRef();
  const emailRef = useRef();
  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
    nameRef.current.value = '';
    emailRef.current.value = '';
    e.preventDefault();
  }


  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <br />
        <input type="text" ref={nameRef} />
        <br />
        <input type="email" ref={emailRef} />
        <br />
        <input type="submit" value="Add to db" />
      </form>


      <ul>
        {users.map(user => <li key={user.id}>{user.id} :{user.name}- {user.email}</li>)}
      </ul>
    </div>
  );
}

export default App;
