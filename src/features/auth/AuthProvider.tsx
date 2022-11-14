import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import axios from '../../lib/axios';
import { IUser } from './types';

export type TAuthState = {
  user: IUser | null | undefined;
  isCheckingUser: boolean;
};

export type TAuthContextValue = TAuthState & {
  saveUser: (user: IUser) => void;
  removeUser: () => void;
};

const initialAuthState: TAuthState = {
  user: null,
  isCheckingUser: true,
};

const initialAuthContextValue: TAuthContextValue = {
  user: initialAuthState.user,
  saveUser: (user: IUser) => {},
  removeUser: () => {},
  isCheckingUser: initialAuthState.isCheckingUser,
};

type TAuthAction = {
  type: 'SAVE_USER' | 'REMOVE_USER' | 'CHECKING_USER';
  payload?: IUser | null;
};

const authReducer = (state: TAuthState, action: TAuthAction): TAuthState => {
  switch (action.type) {
    case 'SAVE_USER': {
      return {
        user: action.payload,
        isCheckingUser: false,
      };
    }
    case 'REMOVE_USER': {
      return {
        user: null,
        isCheckingUser: false,
      };
    }
    case 'CHECKING_USER': {
      return {
        user: null,
        isCheckingUser: true,
      };
    }
    default: {
      return state;
    }
  }
};

const useAuthState = () => {
  const [{ user, isCheckingUser }, dispatch] = useReducer(
    authReducer,
    initialAuthState,
  );

  useEffect(() => {
    const checkUser = async () => {
      try {
        dispatch({ type: 'CHECKING_USER' });
        const res = await axios.get('/auth/user');

        saveUser(res.data as IUser);
      } catch (err) {
        removeUser();
      }
    };

    checkUser();
  }, []);

  const saveUser = (user: IUser) => {
    dispatch({ type: 'SAVE_USER', payload: user });
  };

  const removeUser = () => {
    dispatch({ type: 'REMOVE_USER' });
  };

  return {
    user,
    isCheckingUser,
    saveUser,
    removeUser,
  };
};

const AuthContext = createContext<TAuthContextValue>(initialAuthContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
