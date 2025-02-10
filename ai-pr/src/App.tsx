import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import ChatSimple from './components/ChatSimple'
import GenerateReact from './components/GenerateReact'
import ChatReact from './components/ChatReact'
import GenerateSimple from './components/GenerateSimple'

function App() {

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/chatReact",
          element: <ChatReact />
        },
        {
          path: "/chatSimple",
          element: <ChatSimple />
        },
        {
          path: "/generateReact",
          element: <GenerateReact />
        },
        {
          path: "/generateSimple",
          element: <GenerateSimple />
        }
      ]
    }
  ])

  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>

  )
}

export default App
