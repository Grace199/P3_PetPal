import React, { useEffect, useState } from 'react'
import Room from '../Room'

const Index = ({ setChatID }) => {
    const [allRooms, setAllRooms] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setAllRooms([1]);
    }, [])

    return (
        <>
            {open ?
                < div
                    className={`bg-background-secondary max-md:w-screen max-md:fixed w-full md:w-[360px] z-10 h-full flex-col border-r border-black  overflow-y-scroll flex`}
                    onClick={() => setOpen(false)}
                >
                    {allRooms?.length > 0 ? (<>
                        <Room setChatID={setChatID} chatID={1} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={2} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={3} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={4} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={5} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={6} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={7} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                        <Room setChatID={setChatID} chatID={8} image={'unknown'} />
                    </>)
                        :
                        (
                            <div className='w-full h-full flex justify-center items-center'>
                                <p>No chats</p>
                            </div>

                        )
                    }
                </div > : <button className='absolute pt-1 pl-3 hover:text-primary md:hidden' onClick={() => { setOpen(true) }}><i className="uil uil-arrow-circle-left text-5xl"></i></button>}
        </>


    )
}

export default Index
