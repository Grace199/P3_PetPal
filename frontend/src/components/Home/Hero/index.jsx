import React from 'react'
import backdrop from '../../../assets/images/Home/heroBanner.jpg';
import './style.css';
import { Link } from 'react-router-dom';

const index = () => {
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

            <div className="flex justify-center flex-col absolute bottom-2 md:bottom-12 w-full form-container gap-5 max-md:gap-2">
                <form className="text-background flex gap-7 bg-primary p-2 px-5 rounded-xl max-md:gap-2 max-md:justify-center max-md:text-sm">
                    <label className="max-md:hidden">Choose a category: </label>
                    <div className="custom-radio-select flex gap-3 max-md:gap-1">
                        <input
                            type="radio"
                            id="Dogs"
                            name="searchType"
                            value="Dogs"
                            checked
                        />
                        <label htmlFor="Dogs" className="cursor-pointer hover:text-[#d2d2d2]">
                            Dogs
                        </label>

                        <input
                            type="radio"
                            id="Cats"
                            name="searchType"
                            value="Cats"
                        />
                        <label htmlFor="Cats" className="cursor-pointer hover:text-[#d2d2d2]">
                            Cats
                        </label>

                        <input
                            type="radio"
                            id="Others"
                            name="searchType"
                            value="Others"
                        />
                        <label htmlFor="Others" className="cursor-pointer hover:text-[#d2d2d2]">
                            Others
                        </label>

                        <input
                            type="radio"
                            id="Shelters"
                            name="searchType"
                            value="Shelters"
                        />
                        <label htmlFor="Shelters" className="cursor-pointer hover:text-[#d2d2d2]">
                            Shelters
                        </label>
                    </div>
                </form>
                <form className="grid grid-cols-6 gap-5 text-background max-md:grid-cols-4 max-md:gap-2 max-md:text-sm">
                    <select
                        name="breed"
                        id="breed"
                        className="bg-[#dcdcdc5b] text-center col-span-2 py-6 rounded-xl border border-background cursor-pointer hover:bg-[#ffffff87]"
                    >
                        <option value="" disabled defaultValue hidden>
                            Breed
                        </option>
                        <option value="Dachshund">Dachshund</option>
                        <option value="Pug">Pug</option>
                        <option value="Boston Terrier">Boston Terrier</option>
                        <option value="Shiba Inu">Shiba Inu</option>
                    </select>

                    <select
                        name="location"
                        id="location"
                        className="bg-[#dcdcdc5b] text-center col-span-2 py-6 rounded-xl border border-background cursor-pointer hover:bg-[#ffffff87]"
                    >
                        <option value="" disabled defaultValue hidden>
                            Location
                        </option>
                        <option value="Toronto">Toronto</option>
                        <option value="Vancouver">Vancouver</option>
                    </select>

                    <select
                        name="age"
                        id="age"
                        className="bg-[#dcdcdc5b] text-center col-span-2 md:col-span-1 py-6 rounded-xl border border-background cursor-pointer hover:bg-[#ffffff87]"
                    >
                        <option value="" disabled defaultValue hidden>
                            Age
                        </option>
                        <option value="puppies">Puppies</option>
                        <option value="juveniles">Juveniles</option>
                        <option value="young-Adults">Young Adults</option>
                        <option value="mature-Adults">Mature Adults</option>
                        <option value="seniors">Seniors</option>
                    </select>
                    <Link to="/search" className="bg-accent-100 text-center col-span-2 md:col-span-1 py-6 rounded-xl border border-background cursor-pointer hover:bg-accent-200">
                        Search Now
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default index
