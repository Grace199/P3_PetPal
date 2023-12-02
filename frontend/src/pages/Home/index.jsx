import React from 'react'
import Hero from '../../components/Home/Hero'
import NearByPet from '../../components/Home/NearByPet'
import NearByShelter from '../../components/Home/NearByShelter'
import Blogs from '../../components/Home/Blogs'


const Home = () => {
    return (
        <main className="w-full z-0">
            <Hero />
            <NearByPet />
            <NearByShelter />
            <Blogs />
        </main>
    )
}

export default Home;

