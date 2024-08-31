import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectAuthRoutes from './Components/ProtectAuthRoutes/ProtectAuthRoutes'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Orders from './Components/Orders/Orders'
import { Offline, Online } from 'react-detect-offline'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import WishList from './Components/WishList/WishList'
import CashOrder from './Components/CashOrder/CashOrder'

function App() {

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectAuthRoutes><Login /></ProtectAuthRoutes> },
        { path: 'register', element: <ProtectAuthRoutes><Register /></ProtectAuthRoutes> },
        { path: 'forgotPassword', element: <ProtectAuthRoutes><ForgotPassword /></ProtectAuthRoutes> },
        { path: 'resetPassword', element: <ProtectAuthRoutes><ResetPassword /></ProtectAuthRoutes> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute><WishList /> </ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: 'cashOrder/:cartId', element: <ProtectedRoute><CashOrder /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },

      ]
    }
  ])

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
        <Offline>
          <div className='fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200'>
            Only shown offline (surprise!)
          </div>
        </Offline>
      </AuthContextProvider>
    </>
  )
}

export default App
