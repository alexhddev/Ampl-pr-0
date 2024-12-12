import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Places from './components/Places'
import Home from './components/Home'
import PlacesDetails from './components/PlaceDetails'
import CreatePlace from './components/CreatePlace'
import NavBar from './components/Navbar'
import Auth from './components/Auth'

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
          path: "/places",
          element: <Places />
        },
        {
          path: "/places/create",
          element: <CreatePlace />
        },
        {
          path: "/places/:id",
          element: <PlacesDetails />
        },
        {
          path: "/auth",
          element: <Auth />
        }
      ]
    }
  ])

  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route index element={<Home />} />
    //     <Route path="places">
    //       <Route index element={<Places />} />
    //       <Route path='create' element={<CreatePlace />} />
    //       <Route path=":id" element={<PlacesDetails />} />
    //     </Route>

    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
