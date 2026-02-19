import React, { useState } from 'react'
import backdrop from '../../../assets/images/Home/heroBanner.jpg';
import './style.css';
import { useNavigate } from "react-router-dom";


const Index = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        animal: 'dog',
        breed: null,
        size: null,
        age: null,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { animal, breed, size, age } = formData;
        navigate(`/petlistings?animal=${animal}${breed ? `&breed=${breed}` : ''}${size ? `&size=${size}` : ''}${age ? `&age=${age}` : ''}`)
    }

    return (
        <div className="w-full max-md:h-[80vh] h-[70vh] bg-black relative flex justify-center items-center flex-col">
            <img
                src={backdrop}
                alt="Dog and Cat cuddling"
                className="object-cover w-full h-full opacity-60 absolute"
            />
            <div className="flex justify-center items-center flex-col px-mobile md:px-tablet xl:px-desktop">
                <h1 className="text-background font-bold text-8xl text-center max-sm:text-7xl z-0 mb-3">
                    PetPal
                </h1>
                <h2 className="text-background font-bold text-4xl text-center max-md:text-3xl max-sm:text-lg z-0">
                    find your fur-ever friend.
                </h2>
            </div>

            <form className="flex justify-center flex-col absolute bottom-2 md:bottom-12 w-full form-container gap-5 max-md:gap-2" onSubmit={handleSubmit}>
                <div className="text-background flex gap-7 bg-primary p-2 px-5 rounded-xl max-md:gap-2 max-md:justify-center max-md:text-sm">
                    <label className="max-md:hidden">Choose a category: </label>
                    <div className="custom-radio-select flex gap-3 max-md:gap-1">
                        <input
                            type="radio"
                            id="Dogs"
                            name="animal"
                            value="dog"
                            defaultChecked
                            onChange={handleInputChange}
                        />
                        <label htmlFor="Dogs" className="cursor-pointer hover:text-[#d2d2d2]">
                            Dogs
                        </label>

                        <input
                            type="radio"
                            id="Cats"
                            name="animal"
                            value="cat"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="Cats" className="cursor-pointer hover:text-[#d2d2d2]">
                            Cats
                        </label>

                        <input
                            type="radio"
                            id="Others"
                            name="animal"
                            value="other"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="Others" className="cursor-pointer hover:text-[#d2d2d2]">
                            Others
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-5 text-background max-md:grid-cols-4 max-md:gap-2 max-md:text-sm">
                    <input
                        name="breed"
                        id="breed"
                        className="bg-[#727272ab] text-center col-span-2 py-6 rounded-xl border border-background placeholder-[#ffffffce] cursor-pointer hover:bg-[#ffffff87] focus:outline-none"
                        type='text'
                        placeholder='Enter Breed'
                        onChange={handleInputChange}
                    />

                    <select
                        name="size"
                        id="size"
                        className="bg-[#727272ab] text-center col-span-2 py-6 rounded-xl border border-background placeholder-[#ffffffce] cursor-pointer hover:bg-[#ffffff87] focus:outline-none"
                        onChange={handleInputChange}
                    >
                        <option value="">Select Size</option>
                        <option value="1">Small</option>
                        <option value="2">Medium</option>
                        <option value="3">Large</option>
                    </select>

                    <select
                        name="age"
                        id="age"
                        className="bg-[#727272ab] text-center col-span-2 md:col-span-1 py-6 rounded-xl border border-background placeholder-[#ffffffce] cursor-pointer hover:bg-[#ffffff87] focus:outline-none"
                        onChange={handleInputChange}
                    >
                        <option value="">Select Age</option>
                        <option value="1">Infant</option>
                        <option value="2">Young</option>
                        <option value="3">Adult</option>
                        <option value="4">Senior</option>
                    </select>
                    <input value={"Search Now"} type='submit' className="bg-accent-100 text-center col-span-2 md:col-span-1 py-6 rounded-xl border border-background cursor-pointer hover:bg-accent-200" />
                </div>
            </form>
        </div>
    )
}

export default Index
