import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/routes.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className='max-w-screen-xl mx-auto'>
          <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
