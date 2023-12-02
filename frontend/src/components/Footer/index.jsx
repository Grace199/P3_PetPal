import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

const index = () => {
    return (
        <footer
            class="mx-mobile md:mx-tablet xl:mx-desktop bg-background-secondary px-16 xl:px-28 py-10 flex flex-col max-md:gap-6 gap-12 rounded-3xl xl:pr-36 max-md:justify-center max-md:items-center mt-52 mb-6 sm:mb-16"
        >
            <div class="flex items-center gap-3">
                <img src={logo} alt="logo" />
                <h2 class="font-bold text-xl">PetPal</h2>
            </div>
            <div
                class="flex justify-between items-center max-md:flex-col max-md:gap-12"
            >
                <Link
                    to="/"
                    class="text-center bg-text text-background px-6 sm:px-12 py-6 rounded-3xl text-lg font-bold self-start hover:scale-105 duration-100"
                >Find Your BFF!</Link>

                <div class="flex-col flex gap-4 md:gap-5 max-md:items-center">
                    <h2 class="text-gray text-lg">ARTICLES</h2>
                    <Link to="/blogs" class="hover:underline">Pet Care</Link>
                    <Link to="/blogs" class="hover:underline">Pet Training</Link>
                    <Link to="/blogs" class="hover:underline">Adoption Tips</Link>
                    <Link to="/blogs" class="hover:underline">Others</Link>
                </div>

                <div class="flex-col flex gap-4 md:gap-5 max-md:items-center">
                    <h2 class="text-gray text-lg">PETS</h2>
                    <Link to="/blogs" class="hover:underline">Pets Near By</Link>
                    <Link to="/blogs" class="hover:underline">Dogs</Link>
                    <Link to="/blogs" class="hover:underline">Cats</Link>
                    <Link to="/blogs" class="hover:underline">Others</Link>
                </div>
            </div>
            <hr class="md:hidden w-full text-gray" />
            <p class="text-center">Copyright © 2023 by PetPal.</p>
        </footer>
    )
}

export default index
