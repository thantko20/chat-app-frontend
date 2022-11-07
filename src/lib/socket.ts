import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import storage from '../utils/storage';

const socket = io('localhost:5000', {
  autoConnect: false,
});

export default socket;
