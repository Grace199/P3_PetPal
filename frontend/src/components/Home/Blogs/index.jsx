import React from 'react'

const index = () => {
    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">Blogs & Articles</h1>
            <h2 className="text-3xl text-center">Shelter Stories & Insights</h2>
            <div className="grid grid-cols-5 w-full gap-3 max-md:grid-cols-1 mt-12">
                <a
                    className="bg-primary md:col-span-2 h-[300px] rounded-3xl text-text flex justify-center items-center flex-col gap-5 p-10 duration-200 hover:scale-[1.02]"
                >
                    <h2 className="text-center text-4xl underline font-bold">
                        Pet Training
                    </h2>
                    <p className="text-center">
                        Proven methods for a well-behaved and happy pet.
                    </p>
                </a>
                <a
                    className="bg-secondary md:col-span-3 h-[300px] rounded-3xl text-text flex justify-center items-center flex-col gap-5 p-10 duration-200 hover:scale-[1.02]"
                >
                    <h2 className="text-center text-4xl underline font-bold">Pet Care</h2>
                    <p className="text-center">
                        Expert tips for your pet's well-being, from grooming to nutrition.
                    </p>
                </a>
                <a
                    className="bg-text md:col-span-3 h-[300px] text-background flex justify-center items-center flex-col gap-5 p-10 rounded-3xl duration-200 hover:scale-[1.02]"
                >
                    <h2 className="text-center text-4xl underline font-bold">
                        Adoption Tips
                    </h2>
                    <p className="text-center">
                        Guidance for a smooth transition with your new family member.
                    </p>
                </a>
                <a
                    className="bg-accent-100 md:col-span-2 h-[300px] text-background flex justify-center items-center flex-col gap-5 p-10 rounded-3xl duration-200 hover:scale-[1.02]"
                >
                    <h2 className="text-center text-4xl underline font-bold">Others</h2>
                    <p className="text-center">
                        Diverse topics on pets and animal welfare, from rescue stories to
                        pet-friendly living.
                    </p>
                </a>
            </div>
        </div>
    )
}

export default index
