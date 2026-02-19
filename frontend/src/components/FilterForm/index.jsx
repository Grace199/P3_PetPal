import React from 'react'

const Index = ({ openFilter, setOpenFilter, handleInputChange, handleSubmit, shelter }) => {
    return (
        <div className={openFilter ? 'block' : 'hidden'}>
            <form
                className={`bg-background w-screen sm:w-[460px] fixed top-0 h-screen overflow-y-auto  right-0 z-[45] shadow-lg`}
                id="filter_menu"
                onSubmit={handleSubmit}
            >
                <div className="flex justify-between p-5 border-b border-light-gray">
                    <p className="text-xl">All Filters:</p>
                    <button id="done_btn" className="hover:scale-105 active:scale-95" onClick={() => setOpenFilter(false)}>
                        Close
                    </button>
                </div>

                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Animal</p>
                        <select name="animal" className='hover:cursor-pointer w-1/2 p-2 rounded-md' onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Breed</p>
                        <input type='text' name='breed' className='p-2 rounded-md w-1/2' onChange={handleInputChange} />
                    </div>
                </div>

                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Age</p>
                        <select name="age" className='hover:cursor-pointer w-1/2 p-2 rounded-md' onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="1">Infant</option>
                            <option value="2">Young</option>
                            <option value="3">Adult</option>
                            <option value="4">Senior</option>
                        </select>
                    </div>
                </div>

                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Size</p>
                        <select name="size" className='hover:cursor-pointer w-1/2 p-2 rounded-md' onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="1">Small</option>
                            <option value="2">Medium</option>
                            <option value="3">Large</option>
                        </select>
                    </div>
                </div>

                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Colour</p>
                        <select name="colour" className='hover:cursor-pointer w-1/2 p-2 rounded-md' onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="golden">Golden</option>
                        </select>
                    </div>
                </div>

                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Sex</p>
                        <select name="sex" className='hover:cursor-pointer w-1/2 p-2 rounded-md' onChange={handleInputChange}>
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">White</option>
                        </select>
                    </div>
                </div>
                {
                    !shelter && <div className="p-5 border-b border-light-gray">
                        <div className="flex justify-between">
                            <p className="text-xl self-center">Shelter</p>
                            <input type='text' name='shelter' className='p-2 rounded-md w-1/2' onChange={handleInputChange} />
                        </div>
                    </div>
                }


                <div className="p-5 border-b border-light-gray">
                    <div className="flex justify-between">
                        <p className="text-xl self-center">Status</p>
                        <select name="status" className='hover:cursor-pointer w-1/2 p-2 rounded-md' onChange={handleInputChange}   >
                            <option value=""></option>
                            <option value="AVAILABLE">Available</option>
                            <option value="WITHDRAWN">Withdrawn</option>
                            <option value="ADOPTED">Adopted</option>
                        </select>
                    </div>
                </div>


                <div className="w-full mb-5 flex justify-center items-center pt-10">
                    <button
                        className="text-background bg-accent-100 rounded-lg md:px-24 px-8 py-4 text-center hover:bg-accent-200 active:scale-95 hover:scale-105 z-50"
                        id="apply_filter_btn"
                        onClick={() => setOpenFilter(false)}
                    >
                        Apply Filters
                    </button>
                </div>
            </form>
            <div className="bg-black w-screen h-screen fixed top-0 left-0 z-[41] opacity-70">
            </div>
        </div>
    )
}

export default Index
