import React, {useEffect, useState} from 'react'
import AnimalCardBlue from '../../AnimalCardBlue'
import { Link, useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../../util/ajax'


const Index = () => {
    const [petListings, setPetlistings] = useState(null)
    const navigate = useNavigate();
    const getListings = async () => {
        const res = await ajax_or_login('/petlisting', {method: "GET"}, navigate);
        if (res.ok) {
            const data = await res.json();
            
            setPetlistings([data.results[0], data.results[1], data.results[2]]);
        }
    }

    useEffect(() => {
        getListings();
    }, [])

    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16 shadow-sm"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">New Pet Listings!</h1>
            <h2 className="text-3xl text-center">meet new friends</h2>
            <div className="w-full flex justify-evenly mt-12 gap-3 text-background">
            {petListings && 
                petListings.map(listing => (
                    <AnimalCardBlue name={listing.pet.name} id={listing.id} img={listing.pet.image1} />
                ))
            }
            </div>

            <Link
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                to="/petlistings"
            >
                See more friends
            </Link>
        </div>
    )
}

export default Index
