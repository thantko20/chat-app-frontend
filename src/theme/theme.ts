import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export default extendTheme({
  config: themeConfig,
  styles: {
    global: {
      body: {
        minHeight: '100vh',
      },
    },
  },
  fonts: {
    body: `'Poppins', sans-serif`,
  },
});
