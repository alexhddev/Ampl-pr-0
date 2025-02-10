import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Home from './components/Home'
import NavBar from './components/NavBar'
import ChatSimple from './components/ChatSimple'
import ChatReact from './components/ChatReact'
import GenerateRecipe from './components/GenerateRecipe'

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
          path: "/generateRecipe",
          element: <GenerateRecipe />
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
