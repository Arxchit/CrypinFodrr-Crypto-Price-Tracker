import React, { useState, useContext } from 'react'
import './Navbar.css'
import { CoinContext } from '../../Contexts/CoinContext'
import { HiMenu, HiX } from "react-icons/hi"; // HiX for close icon
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { setCurrency } = useContext(CoinContext)
    const [menuOpen, setMenuOpen] = useState(false)

    const currencyHandler = (e) => {
        switch (e.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
            case "eur": {
                setCurrency({ name: "eur", symbol: "€" })
                break;
            }
            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" })
                break;
            }
            default: {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
        }
    }

    return (
        <div className='navbar'>
            <Link to={'/'}>
            <img src= "/logo.png" alt="" className='logo' />
            </Link>

            {/* Desktop Menu */}
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
               <Link to={'/'}> <li>Home</li></Link>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>

            <div className="nav-right">
                <select onChange={currencyHandler}>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>
                <button>Sign Up <img src="/arrow_icon.png" alt="" /></button>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <HiX size={28} color="#fff" /> : <HiMenu size={28} color="#fff" />}
                </div>

            </div>
        </div>
    )
}

export default Navbar
