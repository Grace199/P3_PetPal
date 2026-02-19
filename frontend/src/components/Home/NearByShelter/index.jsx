import React, { useEffect, useState } from 'react'
import ShelterCard from '../../ShelterCard'
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
            <div className="max-sm:flex-col w-full flex justify-evenly mt-12 gap-3 text-accent-100">
                {shelters && (<>
                    {shelters[0] && <ShelterCard key={shelters[0].id} name={shelters[0].account.name} id={shelters[0].id} img={shelters[0].account.avatar} />}
                    {shelters[1] && <ShelterCard key={shelters[1].id} name={shelters[1].account.name} id={shelters[1].id} img={shelters[1].account.avatar} />}
                    {shelters[2] && <ShelterCard key={shelters[2].id} name={shelters[2].account.name} id={shelters[2].id} img={shelters[2].account.avatar} />}
                </>
            )}
            </div>

            <Link
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                to="/shelter/all/"
            >Discover more</Link>
        </div>
    )
}

export default Index
