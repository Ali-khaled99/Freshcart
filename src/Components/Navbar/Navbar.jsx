import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  let {userToken, setUserToken} = useContext(AuthContext)
  const navigate = useNavigate()
  function signOut(){
    setUserToken("")
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (

    <header className=" bg-gray-800 fixed z-50 w-full p-2 ">
      <nav className="w-4/5 mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className='flex items-center'>
            <div className="text-white font-bold text-2xl me-8 ">
              <a href="#" ><i className="fa-solid fa-cart-shopping me-2" style={{"color": "#4ea64e"}}></i>FreshCart</a>
            </div>
            {userToken && <div className="hidden md:block">
              <ul className="flex items-center space-x-2">
                <li><NavLink to={'/'} className="block px-2 py-2 text-white">Home</NavLink></li>
                <li><NavLink to={'/products'} className="block px-2 py-2 text-white">Products</NavLink></li>
                <li><NavLink to={'/wishList'} className="block px-2 py-2 text-white">WishList</NavLink></li>
                <li><NavLink to={'/categories'} className="block px-2 py-2 text-white">Categories</NavLink></li>
                <li><NavLink to={'/brands'} className="block px-2 py-2 text-white">Brands</NavLink></li>
                <li><NavLink to={'/cart'} className="block px-2 py-2 text-white">Cart</NavLink></li>
              </ul>
            </div>}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
                <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className='flex gap-1 items-center'>
          <div className='social-media'>
            <i className='text-white mx-1 fa-brands fa-facebook-f'></i>
            <i className='text-white mx-1 fa-brands fa-twitter'></i>
            <i className='text-white mx-1 fa-brands fa-linkedin'></i>
            <i className='text-white mx-1 fa-brands fa-youtube'></i>
            <i className='text-white mx-1 fa-brands fa-tiktok'></i>
          </div>
          <div>
            <ul className='flex gap-1'>
              {!userToken && <>
              <li><NavLink to={'/login'} className="block px-2 py-2 text-white">Login</NavLink></li>
              <li><NavLink to={'/register'} className="block px-2 py-2 text-white">Register</NavLink></li>
              </>}
              {userToken && <li><button onClick={signOut} className="block px-2 py-2 text-white">SignOut</button></li>}
            </ul>
          </div>
          </div>
        </div>
        {userToken && <div className={isOpen ? "mobile-menu md:hidden" : "mobile-menu md:hidden hidden"}>
          <ul className="mt-4 space-y-4">
            <li><NavLink to={'/'} className="block px-2 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
            <li><NavLink to={'/products'} className="block px-2 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
            <li><NavLink to={'/categories'} className="block px-2 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
            <li><NavLink to={'/brands'} className="block px-2 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
            <li><NavLink to={'/cart'} className="block px-2 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
          </ul>

        </div>
}
      </nav>
    </header>
  )
}
