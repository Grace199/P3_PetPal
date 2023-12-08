import React, { useEffect, useState } from 'react'
import ShelterCard from '../../ShelterCard'
import backdrop from '../../../assets/images/Home/heroBanner.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../../util/ajax'

const Index = () => {
    const [shelters, setShelters] = useState(null)
    const navigate = useNavigate();
    const getShelters = async () => {
        const res = await ajax_or_login('/accounts/shelter', { method: "GET" }, navigate);
        if (res.ok) {
            const data = await res.json();
            setShelters([data.results[0], data.results[1], data.results[2]]);
        }
    }

    useEffect(() => {
        getShelters();
    }, [])
    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16 bg-[#FAFAFA]"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">Shelters & Rescues</h1>
            <h2 className="text-3xl text-center">trusted adoption centers</h2>
            <div className="w-full flex justify-evenly mt-12 gap-3 text-accent-100">
                {shelters &&
                    shelters.map(shelter => (
                        <ShelterCard key={shelter.id} name={shelter.account.name} id={1} img={shelter.account.avatar} />
                    ))
                }
            </div>

            <Link
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                to="/searchPage/"
            >Discover more</Link>
        </div>
    )
}

export default Index
