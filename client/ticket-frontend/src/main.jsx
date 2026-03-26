import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App, TicketsApp, LoginApp, SignUpApp, BuyTicketsApp, MyProfileApp } from './App.jsx'
import "./index.css";
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './components/context/AuthContext.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const root = document.getElementById("root");

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/tickets', element: <ProtectedRoute><TicketsApp/></ProtectedRoute>},
  {path: 'concerts/:id', element: <BuyTicketsApp/>},
  {path: '/login', element: <LoginApp/>},
  {path: '/signup', element: <SignUpApp/>},
  {path: '/my-profile', element: <ProtectedRoute><MyProfileApp/></ProtectedRoute>}
]);

ReactDOM.createRoot(root).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router = {router} />
      </AuthProvider>
  </StrictMode>,
);
