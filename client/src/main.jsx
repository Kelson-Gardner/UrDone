import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import Home from './Home.jsx'
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Menu from './Menu.jsx'
import Add from './Add.jsx'
import SingleProfile from './SingleProfile.jsx'
import Edit from './Edit.jsx'

const router = createHashRouter([
{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/home",
      element: <Home />
  },
  {
    path: "/add",
    element: <Add />
},
{
  path: "/menu/:id",
  element: <SingleProfile />
},
{
  path: "/menu",
  element: <Menu />
},
{
  path: "/edit",
  element: <Edit />
}

]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
