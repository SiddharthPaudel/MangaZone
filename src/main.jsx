import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./ContextAPI/Auth"; // ✅ make sure path is correct
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
             <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Default options for all toasts
          className: '',
          duration: 4000,
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid #374151',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
          
          // Default options for specific types
          success: {
            duration: 4000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#1e1e1e',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1e1e1e',
            },
          },
          loading: {
            iconTheme: {
              primary: '#8b5cf6',
              secondary: '#1e1e1e',
            },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
