import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';

const ShelterUpdate = () => {
    const { shelterID } = useParams();
    const [id, setId] = useState(0);
    const [isSeeker, setIsSeeker] = useState(null);
    const [shelter, setShelter] = useState(null);
    const [oriName, setOriName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/accounts/shelter/${shelterID}/`, { method: "GET" }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    setShelter(data);

                    setIsSeeker(JSON.parse(localStorage.getItem("isSeeker")));
                    setId(parseInt(localStorage.getItem("userID")));

                    setOriName(data.account.name);
                    setDescription(data.description);
                    setAddress(data.address);
                    setCity(data.city);
                    setProvince(data.province);
                    setPhoneNumber(data.phone_number);

                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [shelterID, navigate]);

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
    }

    const handleCityChange = (event) => {
        const newCity = event.target.value;
        setCity(newCity);
    }

    const handleAddressChange = (event) => {
        const newAddress = event.target.value;
        setAddress(newAddress);
    }

    const handleProvinceChange = (event) => {
        const newProvince = event.target.value;
        setProvince(newProvince);
    }

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        setPhoneNumber(newPhoneNumber);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePic(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const shelterData = {
                // account: {
                //     avatar: profilePic
                // },
                description: description,
                address: address,
                city: city,
                province: province,
                phone_number: phoneNumber
            }

            const res = await ajax_or_login(`/accounts/shelter/${shelterID}/`, { method: "PATCH", body: JSON.stringify(shelterData), headers: { 'Content-Type': 'application/json' } }, navigate);

            if (!res.ok) {
                if (res.status === 400) {
                    const responseBody = await res.json();
                    if (responseBody) {
                        if (responseBody.account) {
                            if (responseBody.account.avatar) {
                                setError("Invalid profile picture");
                            }
                        } else if (responseBody.address) {
                            setError("Address must not be blank");
                        } else if (responseBody.city) {
                            setError("City must not be blank");
                        } else if (responseBody.province) {
                            setError("Province must not be blank");
                        } else if (responseBody.phone_number) {
                            setError("Please enter a valid Canadian phone number");
                        }
                    }
                }
                console.error("Error during fetch: ", res);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }

    return (
        <>
            <main className="px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16 h-full">
                <div className="bg-[#F2F5FD] w-full rounded-b-2xl">
                    <div className="rounded-2xl flex flex-col overflow-hidden gap-4">
                        <div className="bg-secondary flex flex-row justify-between items-center h-12 px-4 sm:px-12">
                            <p className="text-text text-xl font-semibold">Update Account</p>
                            <Link to={`/shelterDetail/${shelterID}/`}>
                                <i className="uil uil-times text-text text-3xl"></i>
                            </Link>
                        </div>
                        <form className="flex flex-col px-6 sm:px-12 md:px-20 gap-6 pb-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Mission Statement:</p>
                                <textarea rows="5" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={description} onChange={handleDescriptionChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Address:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={address} onChange={handleAddressChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">City:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={city} onChange={handleCityChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Province:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={province} onChange={handleProvinceChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Phone Number:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={phoneNumber} onChange={handlePhoneNumberChange} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Profile Picture:</p>
                                <input type="file" onChange={handleFileChange} />
                            </div>
                            <div className="flex justify-center">
                                <p className="font-semibold text-xs sm:text-sm text-red-500">{error}</p>
                            </div>
                            <div className="flex justify-center md:justify-end">
                                <button type="submit" className="bg-accent-100 rounded-full px-10 py-4 text-[#F2F5FD] font-bold text-lg">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShelterUpdate