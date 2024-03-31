import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

function Navbar() {

    const [Menu, setMenu] = useState("Home")
    const { getTotalCartItems } = useContext(ShopContext)

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>StyleUp.com</p>
            </div>

            <ul className="nav-menu">
                <li onClick={() => { setMenu("Home") }}> <Link style={{ textDecoration: 'none', color: 'black' }} to='/' >Home </Link>{Menu === "Home" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("Men") }}> <Link style={{ textDecoration: 'none', color: 'black' }} to='/men' >  Men</Link>{Menu === "Men" ? <hr /> : <></>} </li>
                <li onClick={() => { setMenu("Women") }}> <Link style={{ textDecoration: 'none', color: 'black' }} to='/women' >  Women</Link>{Menu === "Women" ? <hr /> : <></>} </li>

            </ul>



            <div className="nav-cart">
                {localStorage.getItem('auth-token')
                    ? (<><button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                        <Link to='/cart'> <img src={cart} alt="" /></Link>
                        <div className="cart-count">{getTotalCartItems()}</div></>)
                    : <Link to='/login'> <button>Login</button></Link>}


            </div>



        </div>
    )
}

export default Navbar