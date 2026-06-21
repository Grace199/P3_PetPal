import React from 'react'
import { Link } from 'react-router-dom'

const index = ({ id, img, name, properties }) => {
    return (
        <Link
            to={`/petdetail/${id}/`}
            className="flex flex-col text-accent-100 bg-white text-center rounded-3xl overflow-hidden max-sm:w-full w-[48%] md:w-[40%] lg:w-[23%] hover:-translate-y-1.5 active:translate-y-0 transition duration-200"
        >
            <img
                src={img}
                alt={name}
                className="w-full aspect-square object-cover"
            />
            <h3 className="text-lg md:text-2xl font-semibold pt-1 md:pt-3">
                {name}
            </h3>
            <h3 className="max-md:text-sm pb-2 md:pb-3">{properties}</h3>
        </Link>
    )
}

export default index
