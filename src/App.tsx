import 'antd/dist/reset.css';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { router } from './router/router.tsx';
import ThemeProvider from './providers/ThemeProvider.tsx';
import ReactQueryProvider from './providers/ReactQueryProvider.tsx';

function App() {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export default App;
