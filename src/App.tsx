import React, { FormEvent, useEffect, useState } from 'react';
import axios from './lib/axios';
import socket from './lib/socket';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket);
    });

    socket.on('test', ({ userId }) => {
      console.log(userId);
    });

    return () => {
      socket.off('connect');
      socket.off('test');
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = (await axios.post('/auth/login', {
        email,
        password,
      })) as { userId: string; token: string };
      socket.auth = { userId: data.userId };
      socket.connect();
    } catch (err) {
      socket.disconnect();
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
