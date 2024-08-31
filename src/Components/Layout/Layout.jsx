import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='py-20 w-5/6 mx-auto'>
        <Outlet />
      </div>
    </>
  )
}
