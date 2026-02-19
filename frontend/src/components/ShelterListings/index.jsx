import React, { useEffect, useState, useCallback } from 'react';
import AnimalCardBlue from '../AnimalCardBlue';
import { Link, useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';

const Index = ({ shelterName }) => {
    const [petListings, setPetlistings] = useState(null);
    const navigate = useNavigate();

    const getListings = useCallback(async () => {
        try {
            const res = await ajax_or_login(`/petlisting?shelter=${shelterName}`, { method: "GET" }, navigate);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setPetlistings([data.results[0], data.results[1], data.results[2]]);
            }
        } catch (error) {
            console.error("Error fetching pet listings:", error);
        }
    }, [shelterName, navigate]);

    useEffect(() => {
        getListings();
    }, [getListings]);

    return (
        <>
            <div className="w-full max-sm:flex-col flex items-center justify-evenly mt-12 gap-3 text-background">
                {petListings && (
                    <>
                        {petListings[0] && <AnimalCardBlue key={petListings[0].id} name={petListings[0].pet.name} id={petListings[0].id} img={petListings[0].pet.image1} />}
                        {petListings[1] && <AnimalCardBlue key={petListings[1].id} name={petListings[1].pet.name} id={petListings[1].id} img={petListings[1].pet.image1} />}
                        {petListings[2] && <AnimalCardBlue key={petListings[2].id} name={petListings[2].pet.name} id={petListings[2].id} img={petListings[2].pet.image1} />}
                    </>
                )}
            </div>
        </>
    );
};

export default Index;