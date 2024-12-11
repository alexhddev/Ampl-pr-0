import { Routes, Route, BrowserRouter } from 'react-router'
import './App.css'
import Places from './components/Places'
import Home from './components/Home'
import PlacesDetails from './components/PlaceDetails'
import CreatePlace from './components/CreatePlace'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="places">
          <Route index element={<Places />} />
          <Route path='create' element={<CreatePlace />} />
          <Route path=":id" element={<PlacesDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
