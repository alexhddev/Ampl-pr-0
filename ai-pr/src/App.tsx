import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Chat from './components/Chat'
import Chat2 from './components/Chat2'
import Generate from './components/Generate'

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
          path: "/chat",
          element: <Chat />
        },
        {
          path: "/chat2",
          element: <Chat2 />
        },
        {
          path: "/generate",
          element: <Generate />
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
