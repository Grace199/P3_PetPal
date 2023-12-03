import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import hamburger from '../../assets/images/hamburger.svg'
import cross from '../../assets/images/cross.svg'
import { useState } from 'react'

const Index = () => {
    const [openNav, setOpenNav] = useState(false);

    return (
        <header className="sticky bg-background w-full z-40 top-0">
            <nav
                className="w-full flex justify-between py-3 px-mobile md:px-tablet xl:px-desktop max-md:pt-10 shadow-sm"
            >
                <Link to="/">
                    <img
                        src={logo}
                        className="h-12 hover:scale-105 hover:rotate-6 duration-200"
                        alt="PetPal logo"
                    />
                </Link>
                <div className="gap-5 justify-center items-center hidden md:flex">
                    <Link to="/blogs" className="text-base hover:text-secondary hover:scale-105"
                    >Blogs</Link>
                    <div className="bg-text w-[0.7px] h-3/4"></div>
                    <Link
                        to="/login"
                        className="py-3 px-6 border-text border rounded-3xl hover:bg-secondary hover:scale-105 duration-150"
                    >Login</Link>
                    <Link
                        to="/signup"
                        className="py-3 px-6 border-text border rounded-3xl bg-accent-100 hover:scale-105 text-background hover:bg-secondary hover:text-text duration-150"
                    >Sign up</Link>
                </div>
                <button className="md:hidden" id="menu-bar" onClick={() => setOpenNav(prev => !prev)}>
                    <img
                        src={hamburger}
                        alt="Hamburger bar open"
                        id="bar-open"
                        className={openNav ? 'hidden' : 'block'}
                    />
                    <img
                        src={cross}
                        alt="Hamburger bar closed"
                        id="bar-closed"
                        className={openNav ? 'block' : 'hidden'}
                    />
                </button>
            </nav>
            <div
                className={"w-full bg-secondary flex-col md:hidden justify-between z-40 absolute h-screen " + (openNav ? 'block' : 'hidden')}
                id="mobile_menu"
            >
                <div className="w-full flex flex-col">
                    <Link
                        className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                        to="/signup"
                    >Sign Up</Link>
                    <Link
                        className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                        to="/login"
                    >Log In</Link>
                    <Link
                        to="/blogs"
                        className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                    >Blogs</Link>
                </div>
            </div>
        </header>
    )
}

export default Index
