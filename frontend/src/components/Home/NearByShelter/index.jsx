import React from 'react'
import ShelterCard from '../../ShelterCard'
import backdrop from '../../../assets/images/Home/heroBanner.jpg';
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16 bg-[#FAFAFA]"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">Shelters & Rescues</h1>
            <h2 className="text-3xl text-center">trusted adoption centers</h2>
            <div className="w-full flex justify-evenly mt-12 gap-3 text-accent-100">
                <ShelterCard name={"Dog Society"} id={1} img={backdrop} />
                <ShelterCard name={"Dog Society"} id={1} img={backdrop} />
                <ShelterCard name={"Dog Society"} id={1} img={backdrop} />
            </div>

            <Link
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                to="/searchPage/"
            >Discover more</Link>
        </div>
    )
}

export default index
