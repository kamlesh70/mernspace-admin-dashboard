import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

const ThemeProvider = ({ children }: { children?: ReactNode | undefined }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#41B06E',
          colorLink: '#41B06E',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
