import React from 'react'
import { Link } from 'react-router-dom'

const index = ({ id, img, name, properties }) => {
    return (
        <Link
            to={`/petlisting/update/${id}/`}
            className="relative group flex flex-col text-accent-100 hover:bg-black bg-white text-center rounded-3xl max-sm:w-full w-[48%] md:w-[40%] lg:w-[23%] shadow-lg duration-200"
        >
            <img
                src={img}
                alt={name}
                className="w-full aspect-square object-cover rounded-t-3xl group-hover:opacity-50"
            />
            <h3 className="text-lg md:text-2xl font-semibold pt-1 md:pt-3 bg-white">
                {name}
            </h3>
            <h3 className="max-md:text-sm pb-2 md:pb-3 px-3 bg-white rounded-b-3xl">{properties}</h3>
            <div
                className="absolute right-[43%] top-[33%] hidden group-hover:block"
            >
                <i className="uil uil-edit-alt text-white text-5xl"></i>
            </div>
        </Link>
    )
}

export default index
