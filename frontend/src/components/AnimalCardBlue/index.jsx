import React from 'react'
import { Link } from 'react-router-dom'

const index = ({id, img, name}) => {
    return (
        <Link
            to={`/petdetail/${id}/`}
            className="flex flex-col bg-primary text-center rounded-3xl max-w-[340px] shadow-lg hover:scale-105 active:scale-95 duration-200"
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
