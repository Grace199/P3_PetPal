import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

const index = () => {
    return (
        <footer
            className="mx-mobile md:mx-tablet xl:mx-desktop bg-background-secondary px-16 xl:px-28 py-10 flex flex-col max-md:gap-6 gap-12 rounded-3xl xl:pr-36 max-md:justify-center max-md:items-center mt-52 mb-6 sm:mb-16"
        >
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" />
                <h2 className="font-bold text-xl">PetPal</h2>
            </div>
            <div
                className="flex justify-between items-center max-md:flex-col max-md:gap-12"
            >
                <Link
                    to="/"
                    className="text-center bg-text text-background px-6 sm:px-12 py-6 rounded-3xl text-lg font-bold self-start hover:scale-105 duration-100"
                >Find Your BFF!</Link>

                <div className="flex-col flex gap-4 md:gap-5 max-md:items-center">
                    <h2 className="text-gray text-lg">ARTICLES</h2>
                    <Link to="/blogs" className="hover:underline">Pet Care</Link>
                    <Link to="/blogs" className="hover:underline">Pet Training</Link>
                    <Link to="/blogs" className="hover:underline">Adoption Tips</Link>
                    <Link to="/blogs" className="hover:underline">Others</Link>
                </div>

                <div className="flex-col flex gap-4 md:gap-5 max-md:items-center">
                    <h2 className="text-gray text-lg">PETS</h2>
                    <Link to="/blogs" className="hover:underline">Pets Near By</Link>
                    <Link to="/blogs" className="hover:underline">Dogs</Link>
                    <Link to="/blogs" className="hover:underline">Cats</Link>
                    <Link to="/blogs" className="hover:underline">Others</Link>
                </div>
            </div>
            <hr className="md:hidden w-full text-gray" />
            <p className="text-center">Copyright © 2023 by PetPal.</p>
        </footer>
    )
}

export default index
