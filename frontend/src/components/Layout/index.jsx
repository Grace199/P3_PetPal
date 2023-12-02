import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from '../Footer'

const Layout = () => {
    return (
        <>
            <header>header</header>
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
