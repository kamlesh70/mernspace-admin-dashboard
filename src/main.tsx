import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'
import 'antd/dist/reset.css';
import ThemeProvider from './providers/ThemeProvider.tsx';
import ReactQueryProvider from './providers/ReactQueryProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ReactQueryProvider>
        <RouterProvider router={router} />
      </ReactQueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
