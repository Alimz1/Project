import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Create from './pages/Create';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,

  },
  {
    path: "/create",
    element: <Create/>,
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
