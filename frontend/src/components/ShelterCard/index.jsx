import React from 'react'
import { Link } from 'react-router-dom'

const index = ({ id, img, name }) => {
    return (
        <Link
            to={`/shelterDetail/${id}`}
            className="flex flex-col bg-secondary text-center rounded-3xl overflow-hidden max-w-[340px] hover:-translate-y-1.5 active:translate-y-0 transition duration-200"
        >
            <img
                src={img}
                alt={name}
                className="w-full aspect-square object-cover"
            />
            <h3 className="text-2xl font-semibold p-3">{name}</h3>
        </Link>
    )
}

export default index
