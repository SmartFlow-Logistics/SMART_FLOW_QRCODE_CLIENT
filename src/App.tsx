import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import ProductCheck from './pages/ProductCheck';
import NewInventory from './pages/NewInventory';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="check" element={<ProductCheck />} />
      <Route path="newInventory" element={<NewInventory />} />
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
