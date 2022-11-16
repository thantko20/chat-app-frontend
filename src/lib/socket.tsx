import { io, Socket } from 'socket.io-client';
import storage from '../utils/storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from '../features/auth/AuthProvider';

const socketIO = io('ws://localhost:5000', {
  autoConnect: false,
  auth(cb) {
    cb({
      token: storage.getToken(),
    });
  },
});

const SocketContext = createContext<Socket>(socketIO);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, _] = useState<Socket>(socketIO);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
