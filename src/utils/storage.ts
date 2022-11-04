const tokenName = 'chat_app_token';

const storage = {
  getToken: () => {
    return JSON.parse(localStorage.getItem(tokenName) as string);
  },
  setToken: (token: string) => {
    localStorage.setItem(tokenName, JSON.stringify(token));
  },
  clearToken: () => {
    localStorage.removeItem(tokenName);
  },
};

export default storage;
