import React from 'react'

const index = () => {
    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16 shadow-sm"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">Pets near you</h1>
            <h2 className="text-3xl text-center">meet local animals</h2>
            <div className="w-full flex justify-evenly mt-12 gap-3 text-background">
                <a
                    href="./petDetail/petDetail.html"
                    className="flex flex-col bg-primary text-center rounded-3xl w-[340px] shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                    <img
                        src="../assets/images/phase1-animals/rat.jpg"
                        alt="cat"
                        className="w-full aspect-square object-cover"
                    />
                    <h3 className="text-2xl font-semibold p-3">Rat</h3>
                </a>
                <a
                    href="./petDetail/petDetail.html"
                    className="flex flex-col bg-primary text-center rounded-3xl w-[340px] shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                    <img
                        src="../assets/images/phase1-animals/dog.jpg"
                        alt="cat"
                        className="w-full aspect-square object-cover"
                    />
                    <h3 className="text-2xl font-semibold p-3">Rover</h3>
                </a>

                <a
                    href="./petDetail/petDetail.html"
                    className="flex flex-col bg-primary text-center rounded-3xl w-[340px] max-md:hidden shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                    <img
                        src="../assets/images/phase1-animals/turtle.jpg"
                        alt="cat"
                        className="w-full aspect-square object-cover"
                    />
                    <h3 className="text-2xl font-semibold p-3">Chomper</h3>
                </a>
            </div>

            <a
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                href="./searchPage/searchPageInitial.html"
            >See more friends</a
            >
        </div>
    )
}

export default index
