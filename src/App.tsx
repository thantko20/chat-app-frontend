import React, { FormEvent, useEffect, useState } from 'react';
import axios from './lib/axios';
import socket from './lib/socket';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  socket.connect();

  useEffect(() => {
    socket.on('test', ({ message }) => {
      console.log(message);
    });
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await axios.post('/auth/login', {
        email,
        password,
      });

      console.log(data.data);
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <div>
      <h2 className='font-semibold text-xl text-blue-500'>Login Form</h2>
      <form className='flex flex-col gap-4 items-start' onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            className='border-neutral-400 border'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className='border-neutral-400 border'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='px-4 py-2 bg-blue-400'>Submit</button>
      </form>
    </div>
  );
};

export default App;
