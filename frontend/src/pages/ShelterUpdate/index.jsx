import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';

const ShelterUpdate = () => {
    const { shelterID } = useParams();
    const [id, setId] = useState(0);
    const [isSeeker, setIsSeeker] = useState(null);
    const [shelter, setShelter] = useState(null);
    const [oriName, setOriName] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [descriptionErr, setDescriptionErr] = useState("");
    const [addressErr, setAddressErr] = useState("");
    const [cityErr, setCityErr] = useState("");
    const [provinceErr, setProvinceErr] = useState("");
    const [phoneNumberErr, setPhoneNumberErr] = useState("");
    const [profilePicErr, setProfilePicErr] = useState("");
    const [success, setSuccess] = useState("");

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
                    setName(data.account.name);
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

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
    }

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

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const res = await ajax_or_login(`/accounts/shelter/${shelterID}/`, { method: "DELETE" }, navigate);
            if (res.ok) {
                console.log("deleted");
            } else {
                console.error("Error during fetch: ", res);
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let formData = new FormData();
            if (profilePic) {
                formData.append("account.avatar", profilePic);
            }
            if (oriName !== name) {
                formData.append("account.name", name);
            }
            formData.append("description", description);
            formData.append("address", address);
            formData.append("city", city);
            formData.append("province", province);
            formData.append("phone_number", phoneNumber);

            const res = await ajax_or_login(`/accounts/shelter/${shelterID}/`, { method: "PATCH", body: formData }, navigate);

            if (!res.ok) {
                if (res.status === 400) {
                    const responseBody = await res.json();
                    if (responseBody) {
                        if (responseBody.description) {
                            setDescriptionErr("Mission statement field may not be blank.");
                        } else {
                            setDescriptionErr("");
                        }
                        if (responseBody.address) {
                            setAddressErr("Address field may not be blank.");
                        } else {
                            setAddressErr("");
                        }
                        if (responseBody.city) {
                            setCityErr("City field may not be blank.");
                        } else {
                            setCityErr("");
                        }
                        if (responseBody.province) {
                            setProvinceErr("Province field may not be blank.");
                        } else {
                            setProvinceErr("");
                        }
                        if (responseBody.phone_number) {
                            setPhoneNumberErr("Please enter a valid Canadian phone number.");
                        } else {
                            setPhoneNumberErr("");
                        }
                        if (responseBody.account) {
                            if (responseBody.account.name) {
                                if (name === "") {
                                    setNameErr("Shelter name may not be blank.")
                                } else {
                                    setNameErr("Another user with that name already exists.");
                                }
                            } else {
                                setNameErr("");
                            }
                            if (responseBody.account.avatar) {
                                setProfilePicErr("Invalid profile picture.");
                            } else {
                                setProfilePicErr("");
                            }
                        }
                    }
                    setSuccess("");
                }
                console.error("Error during fetch: ", res);
            } else {
                setNameErr("");
                setDescriptionErr("");
                setAddressErr("");
                setCityErr("");
                setProvinceErr("");
                setPhoneNumberErr("");
                setProfilePicErr("");
                setSuccess("Profile successfully updated!")
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
                        <div className="flex flex-col px-6 sm:px-12 md:px-20 gap-6 pb-8">
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Shelter Name:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={name} onChange={handleNameChange} />
                                {nameErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{nameErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Mission Statement:</p>
                                <textarea rows="5" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={description} onChange={handleDescriptionChange} />
                                {descriptionErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{descriptionErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Address:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={address} onChange={handleAddressChange} />
                                {addressErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{addressErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">City:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={city} onChange={handleCityChange} />
                                {cityErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{cityErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Province:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={province} onChange={handleProvinceChange} />
                                {provinceErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{provinceErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Phone Number:</p>
                                <textarea rows="1" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm" value={phoneNumber} onChange={handlePhoneNumberChange} />
                                {phoneNumberErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{phoneNumberErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Profile Picture:</p>
                                <input type="file" onChange={handleFileChange} />
                                {profilePicErr !== "" ?
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-xs sm:text-sm text-red-500">{profilePicErr}</p>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="flex justify-center">
                                <p className="font-semibold text-xs sm:text-sm text-green-500">{success}</p>
                            </div>
                            <div className="flex justify-between">
                                <button onClick={handleDelete} type="submit" className="bg-red-500 rounded-full px-10 py-4 text-[#F2F5FD] font-bold text-lg">Delete</button>
                                <button onClick={handleSubmit} type="submit" className="bg-accent-100 rounded-full px-10 py-4 text-[#F2F5FD] font-bold text-lg">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShelterUpdate