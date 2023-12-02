import React from 'react'
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <header>header</header>
            <Outlet />
            <footer>Footer</footer>
        </>
    )
}

export default Layout
