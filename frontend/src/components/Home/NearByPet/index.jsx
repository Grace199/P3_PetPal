import React from 'react'
import AnimalCardBlue from '../../AnimalCardBlue'
import backdrop from '../../../assets/images/Home/heroBanner.jpg';
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16 shadow-sm"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">Pets near you</h1>
            <h2 className="text-3xl text-center">meet local animals</h2>
            <div className="w-full flex justify-evenly mt-12 gap-3 text-background">
                <AnimalCardBlue name={"rat"} id={1} img={backdrop} />
                <AnimalCardBlue name={"rat"} id={1} img={backdrop} />
                <AnimalCardBlue name={"rat"} id={1} img={backdrop} />
            </div>

            <Link
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                to="/searchPage"
            >
                See more friends
            </Link>
        </div>
    )
}

export default index
