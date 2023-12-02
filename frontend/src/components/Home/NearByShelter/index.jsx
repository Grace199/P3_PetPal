import React from 'react'

const index = () => {
    return (
        <div
            className="px-mobile md:px-tablet xl:px-desktop flex flex-col justify-center items-center py-16 bg-[#FAFAFA]"
        >
            <h1 className="text-5xl font-bold mb-3 text-center">Shelters & Rescues</h1>
            <h2 className="text-3xl text-center">trusted adoption centers</h2>
            <div className="w-full flex justify-evenly mt-12 gap-3 text-accent-100">
                <a
                    href="./shelterDetail/shelterDetailPageUser.html"
                    className="flex flex-col bg-secondary text-center rounded-3xl w-[340px] shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                    <img
                        src="../assets/images/phase1-shelters/1.jpg"
                        alt="cat"
                        className="w-full aspect-square object-cover"
                    />
                    <h3 className="text-2xl font-semibold p-3">Dog Society</h3>
                </a>
                <a
                    href="./shelterDetail/shelterDetailPageUser.html"
                    className="flex flex-col bg-secondary text-center rounded-3xl w-[340px] shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                    <img
                        src="../assets/images/phase1-shelters/2.jpg"
                        alt="cat"
                        className="w-full aspect-square object-cover"
                    />
                    <h3 className="text-2xl font-semibold p-3">Cat Society</h3>
                </a>

                <a
                    href="./shelterDetail/shelterDetailPageUser.html"
                    className="flex flex-col bg-secondary text-center rounded-3xl w-[340px] max-md:hidden shadow-lg hover:scale-105 active:scale-95 duration-200"
                >
                    <img
                        src="../assets/images/phase1-shelters/rac.webp"
                        alt="cat"
                        className="w-full aspect-square object-cover"
                    />
                    <h3 className="text-2xl font-semibold p-3">Rat association</h3>
                </a>
            </div>

            <a
                className="bg-accent-100 text-background p-5 mt-14 rounded-2xl shadow-sm hover:scale-105 duration-300 active:scale-95"
                href="./searchPage/searchPageInitial.html"
            >Discover more</a
            >
        </div>
    )
}

export default index
