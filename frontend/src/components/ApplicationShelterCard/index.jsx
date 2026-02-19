import React from 'react'
import { Link } from 'react-router-dom'

const List = ({ id, seeker_name, pet_img, pet_name, seeker_address, seeker_city, seeker_province }) => {
    return (
        <Link
            className="w-full flex flex-col sm:flex-row rounded-3xl gap-3 sm:gap-9 bg-background hover:bg-background-secondary hover:scale-105 duration-200 active:scale-95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            to={`/applications/update/shelter/${id}/`}
        >
            <img src={pet_img} alt={pet_name} className="object-cover aspect-square h-49 sm:h-48 rounded-l-3xl" />
            <div className="w-full flex flex-col gap-[2px] sm:gap-1 justify-center pl-3 pb-3 sm:pl-0 sm:pb-3">
                <p className="text-accent-100 text-xl sm:text-4xl lg:text-5xl font-bold">{seeker_name}</p>
                <p className="text-accent-100 text-xl sm:text-4xl lg:text-5xl font-bold">{pet_name}</p>
                <div className="flex flex-col">
                    <p className="text-accent-200 text-sm sm:text-xl lg:text-2xl font-semibold">{seeker_city}, {seeker_province}</p>
                    <p className="text-accent-200 text-xs sm:text-base font-semibold">{seeker_address}</p>
                </div>
            </div>
        </Link>
    );
}

export default List