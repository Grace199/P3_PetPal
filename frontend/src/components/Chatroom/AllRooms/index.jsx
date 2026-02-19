import React, { useContext, useEffect, useState } from 'react'
import Room from '../Room'
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { ajax_or_login } from '../../../util/ajax';

const Index = ({ setChatID }) => {
    const [allRooms, setAllRooms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [id, setId] = useState(0);
    const [isSeeker, setIsSeeker] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = `/applications/list/`;
            try {
                setIsSeeker(JSON.parse(localStorage.getItem("isSeeker")));
                setId(parseInt(localStorage.getItem("userID")));

                console.log(localStorage.getItem("access"));
                const res = await ajax_or_login(apiUrl, { method: "GET" }, navigate);
                if (res.ok) {
                    const data = await res.json();
                    setAllRooms(data.results);
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [navigate]);

    return (
        <>
            <div className={`bg-background-secondary max-md:w-screen max-md:fixed w-full md:w-[360px] z-10 h-full flex-col border-r border-black  overflow-y-scroll flex ${open ? 'block' : 'max-md:hidden'}`} onClick={() => setOpen(false)}>
                {allRooms?.length > 0 ? allRooms.map(room => (
                    <Room key={room.id} chatID={room.id} setChatID={setChatID} image={room.shelter.account.avatar} name={isSeeker ? room.shelter.account.name : room.seeker.account.name} petName={room.petlisting.pet.name} />
                )) :
                    <div className='w-full h-full flex justify-center items-center'>
                        <p>No chats</p>
                    </div>
                }
            </div>
            <button className={`absolute pt-1 pl-3 hover:text-primary md:hidden ${open ? 'hidden' : 'block'}`} onClick={() => { setOpen(true) }}><i className="uil uil-arrow-circle-left text-5xl"></i></button>
        </>


    )
}

export default Index
