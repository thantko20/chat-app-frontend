import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import axios from '../../lib/axios';
import storage from '../../utils/storage';
import { IUser } from './types';

export type TAuthState = {
  user: IUser | null | undefined;
  isCheckingUser: boolean;
};

export type TAuthContextValue = TAuthState & {
  saveUser: (user: IUser, token?: string) => void;
  removeUser: () => void;
};

const initialAuthState: TAuthState = {
  user: null,
  isCheckingUser: true,
};

const initialAuthContextValue: TAuthContextValue = {
  user: initialAuthState.user,
  saveUser: (user: IUser, token?: string) => {},
  removeUser: () => {},
  isCheckingUser: initialAuthState.isCheckingUser,
};

const authActionTypes = {
  SAVE_USER: 'SAVE_USER',
  REMOVE_USER: 'REMOVE_USER',
  CHECKING_USER: 'CHECKING_USER',
} as const;

enum AuthActionTypes {
  SAVE_USER = 'SAVE_USER',
  REMOVE_USER = 'REMOVE_USER',
  CHECKING_USER = 'CHECKING_USER',
}

type TAuthAction = {
  // type: keyof typeof authActionTypes;
  type: AuthActionTypes;
  payload?: IUser | null;
};

const authReducer = (state: TAuthState, action: TAuthAction): TAuthState => {
  switch (action.type) {
    case authActionTypes.SAVE_USER: {
      return {
        user: action.payload,
        isCheckingUser: false,
      };
    }
    case authActionTypes.REMOVE_USER: {
      return {
        user: null,
        isCheckingUser: false,
      };
    }
    case authActionTypes.CHECKING_USER: {
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
        dispatch({ type: AuthActionTypes.CHECKING_USER });
        const res: IUser = await axios.get('/auth/user');
        saveAuth(res);
      } catch (err) {
        removeAuth();
      }
    };

    checkUser();
  }, []);

  const saveAuth = (user: IUser, token?: string) => {
    dispatch({ type: AuthActionTypes.SAVE_USER, payload: user });
    if (token) {
      storage.setToken(token);
    }
  };

  const removeAuth = () => {
    dispatch({ type: AuthActionTypes.REMOVE_USER });
    storage.clearToken();
  };

  return {
    user,
    isCheckingUser,
    saveUser: saveAuth,
    removeUser: removeAuth,
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
