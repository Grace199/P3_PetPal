import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ajax_or_login } from '../../util/ajax'

const Index = () => {
    const { petListingID } = useParams();
    const navigate = useNavigate();
    const [petListing, setPetListing] = useState(null);
    const [shelter, setShelter] = useState(null);
    const AGE_CHOICES = ["infant", "young", "adult", "senior"];
    const SIZE_CHOICES = ["small", "medium", "large"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function formatDate(timestamp) {
        const date = new Date(timestamp);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/petlisting/${petListingID}`, {
                    method: "GET"
                }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    setPetListing(data)

                    const result = await ajax_or_login(`/accounts/shelter/${data.shelter}`, {
                        method: "GET"
                    }, navigate);

                    if (result.ok) {
                        const resData = await result.json();
                        console.log(resData);
                        setShelter(resData)
                    }

                    console.log(data)
                } else {
                    console.log("Cant find pet")
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, [petListingID, navigate])

    return (
        <main className="px-mobile md:px-tablet xl:px-desktop py-10">
            <div className="bg-black rounded-3xl w-full max-h-[500px] mb-5 md:hidden" onClick={() => {
                setCurrentImageIndex(prev => (prev + 1) % 3)
            }}>
                <img
                    src={petListing?.pet[`image${currentImageIndex + 1}`]}
                    className="rounded-3xl object-cover w-full max-h-[500px] mb-5 md:hidden"
                    alt='pic of animal'
                />
            </div>

            <div className="grid md:grid-cols-12 gap-[20px]">
                <div className="md:col-span-7 bg-white rounded-3xl">
                    <div
                        className="bg-primary text-white p-10 pl-8 xl:pl-16 text-2xl lg:text-4xl font-bold rounded-t-3xl flex justify-between max-md:flex-col gap-5"
                    >
                        <h1>{petListing?.pet.name}</h1>
                        <div
                            className={`text-xl text-text px-6 py-1 text-center rounded-xl flex justify-center items-center w-max 
                            ${petListing?.status === "AVAILABLE" ? "bg-green-400" : ""} 
                            ${petListing?.status === "WITHDRAWN" ? "bg-red-400" : ""} 
                            ${petListing?.status === "ADOPTED" ? "bg-yellow-400" : ""} 
                            `}
                        >
                            <h2>{petListing?.status}</h2>
                        </div>
                    </div>

                    <div className="px-8 xl:px-16 py-5">
                        <p>{petListing?.pet.breed}</p>
                        <p>{shelter?.city + ', ' + shelter?.province}</p>
                        <p>{`${AGE_CHOICES[petListing?.pet.age - 1]} • ${petListing?.pet.sex} • ${SIZE_CHOICES[petListing?.pet.size - 1]}`}</p>
                        <p>Published on {formatDate(petListing?.date_posted)}</p>
                        <hr className="text-gray my-5 opacity-50" />
                        <div className="my-3">
                            <p className="font-bold">Characteristics</p>
                            <ul>
                                {petListing?.pet.is_friendly && <li>Friendly</li>}
                                {petListing?.pet.is_adventurous && <li>Adventurous</li>}
                                {petListing?.pet.is_energetic && <li>Energetic</li>}
                                {petListing?.pet.is_extroverted && <li>Extroverted</li>}
                                {petListing?.pet.is_introverted && <li>Introverted</li>}
                            </ul>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Health</p>
                            <ul>
                                {petListing?.pet.is_spn && <li>Spayed/Neutered</li>}
                                {petListing?.pet.is_vaccinated && <li>Vaccinated</li>}
                            </ul>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Weight</p>
                            <p>{petListing?.pet.weight} lbs</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Special Needs</p>
                            <p>{petListing?.pet.special_needs || "None"}</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Colours</p>
                            <p>{petListing?.pet.colour}</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Adoption Fee</p>
                            <p>${petListing?.adoption_fee}</p>
                        </div>
                        <hr className="text-gray my-5 opacity-50" />
                        <h2 className="text-4xl text-primary">Say hello to {petListing?.pet.name}</h2>
                        <p className="whitespace-pre-line py-3">
                            {petListing?.pet.description}
                        </p>
                    </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-5">
                    <div className="w-full max-h-[500px] rounded-3xl max-md:hidden bg-black" onClick={() => {
                        setCurrentImageIndex(prev => (prev + 1) % 3)
                    }}>
                        <img
                            src={petListing?.pet[`image${currentImageIndex + 1}`]}
                            className="rounded-3xl object-cover object-center w-full h-full hover:opacity-50 hover:cursor-pointer"
                            alt='pic of pet'
                        />
                    </div>

                    { (JSON.parse(localStorage.getItem("isSeeker")) === true && petListing?.status === "AVAILABLE") && 
                        <div
                            className="bg-accent-100 w-full flex flex-col justify-center items-center p-5 py-20 gap-5 rounded-3xl"
                        >
                            <h2 className="text-white text-center text-2xl lg:text-3xl font-bold">
                                Interested in adopting {petListing?.pet.name}?
                            </h2>
                            <Link to={`/applications/create/${petListingID}`}
                                className="bg-white text-accent-100 rounded-3xl py-3 px-6 lg:px-12 text-xl lg:text-2xl font-bold text-center hover:scale-105 active:scale-95 duration-200"
                            >Apply Now!</Link>
                        </div>
                    }


                    <div
                        className="bg-light-gray w-full flex flex-col justify-center items-center p-5 py-12 gap-5 rounded-3xl"
                    >
                        <div>
                            <img
                                src={shelter?.account.avatar}
                                className="rounded-full aspect-square h-[100px] object-cover object-center"
                                alt='shelter'
                            />
                        </div>
                        <div>
                            <h2 className="text-primary text-center text-3xl font-semibold">
                                {shelter?.account.name}
                            </h2>
                            <p className="text-primary text-center text-xl font-semibold">
                                {shelter?.city + ', ' + shelter?.province}
                            </p>
                        </div>
                        <Link to={`/shelterDetail/${shelter?.id}`}
                            className="bg-white text-accent-100 text-center rounded-3xl py-3 px-6 lg:px-12 text-2xl font-bold hover:scale-105 active:scale-95 duration-200"
                        >Learn More</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Index
