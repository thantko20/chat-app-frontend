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
  saveAuth: (user: IUser) => void;
  removeAuth: () => void;
};

const initialAuthState: TAuthState = {
  user: null,
  isCheckingUser: true,
};

const initialAuthContextValue: TAuthContextValue = {
  user: initialAuthState.user,
  saveAuth: (user: IUser) => {},
  removeAuth: () => {},
  isCheckingUser: initialAuthState.isCheckingUser,
};

const authActionTypes = {
  SAVE_USER: 'SAVE_USER',
  REMOVE_USER: 'REMOVE_USER',
  CHECKING_USER: 'CHECKING_USER',
} as const;

type TAuthAction = {
  type: keyof typeof authActionTypes;
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
        dispatch({ type: authActionTypes.CHECKING_USER });
        const res: IUser = await axios.get('/auth/user');
        saveAuth(res);
      } catch (err) {
        storage.clearToken();
        removeAuth();
      }
    };

    checkUser();
  }, []);

  // Should not inject socket into auth provider
  // TODO: Refactor
  const saveAuth = (user: IUser) => {
    dispatch({ type: authActionTypes.SAVE_USER, payload: user });
  };

  const removeAuth = () => {
    dispatch({ type: authActionTypes.REMOVE_USER });
  };

  return {
    user,
    isCheckingUser,
    saveAuth,
    removeAuth,
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
