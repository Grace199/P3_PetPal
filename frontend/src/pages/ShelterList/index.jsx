import React from 'react'
import List from "./List"
import { useState, useEffect } from 'react'

const Shelters = () => {
    // query stuff
    const [shelters, setShelters] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        // basketball example
    })

    return (
        <>
            <main className="h-full">
                <div className="w-full gap-12 flex flex-row">
                    <List shelters={shelters} />
                </div>
                <div className="w-full flex justify-center align-middle m-2">
                    {/* add buttons that work with query that take you to the next/previous page */}
                </div>
            </main>
        </>
    )
}

export default Shelters