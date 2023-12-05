import React from 'react'
import { Link } from 'react-router-dom'

const index = () => {
    return (
        <Link
            to={`/createlisting/`}
            className="relative group flex flex-col items-center justify-center text-white hover:bg-[#333] bg-gray text-center rounded-3xl max-sm:w-full w-[48%] md:w-[40%] lg:w-[23%] shadow-lg duration-200"
        >
            <img
                alt="void"
                className="w-full aspect-square object-cover rounded-t-3xl invisible"
            />
            <div className="absolute">
              <i className="uil uil-plus text-9xl"></i>
              <p className="text-3xl font-semibold">Create Listing</p>
            </div>
        </Link>
    )
}

export default index
