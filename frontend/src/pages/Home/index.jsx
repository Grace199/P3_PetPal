import React from 'react'
import Hero from '../../components/Home/Hero'
import NewListings from '../../components/Home/NewListings'
import NearByShelter from '../../components/Home/NearByShelter'
import Blogs from '../../components/Home/Blogs'


const Home = () => {
    return (
        <main className="w-full z-0">
            <Hero />
            <NewListings />
            <NearByShelter />
            <Blogs />
        </main>
    )
}

export default Home;

