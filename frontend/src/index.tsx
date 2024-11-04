import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/signInPage';
import SignUp from './pages/signUpPage';




import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
      path:"/",
      element:<div>HELLOOO </div>,
      errorElement:<div>OPPSS ERROR </div>
},

{
  path:"/login",
  element:<Login/>,
},

{
  path:"/signup",
  element:<SignUp/>,
}


]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

