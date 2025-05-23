import React from 'react'
import Logo from '../MovieLogo.png'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
        
        <img className='w-[40px]' src={Logo} alt="" />

        <Link className='text-blue-500 text-3xl font-bold' to="/">Movies</Link>  

        <Link className='text-blue-500 text-3xl font-bold' to="/watchlist">WatchList</Link>

    </div>
  )
}

export default Navbar