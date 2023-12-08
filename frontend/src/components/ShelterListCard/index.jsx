import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ id, name, img, address, city, province }) => {
    return (
        <Link
            className="w-full flex flex-row rounded-3xl gap-9 bg-background hover:bg-background-secondary hover:scale-105 duration-200 active:scale-95"
            to={`/shelterDetail/${id}/`}
        >
            <img src={img} alt={name} className="object-contain aspect-square h-48" />
            <div className="w-full flex flex-col gap-1 justify-center">
                <p className="text-accent-100 text-2xl sm:text-4xl md:text-5xl font-bold">{name}</p>
                <div className="flex flex-col">
                    <p className="text-accent-200 text-base sm:text-xl md:text-2xl font-semibold">{city}, {province}</p>
                    <p className="text-accent-200 text-sm sm:text-base font-semibold">{address}</p>
                </div>
            </div>
        </Link>
    );
}

export default List