import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';

const ShelterUpdate = () => {
    const { shelterID } = useParams();
    const [id, setId] = useState(0);
    const [isSeeker, setIsSeeker] = useState(null);
    const [shelter, setShelter] = useState(null);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ajax_or_login(`/accounts/shelter/${shelterID}/`, { method: "GET" }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    setShelter(data);

                    setIsSeeker(JSON.parse(localStorage.getItem("isSeeker")));
                    setId(parseInt(localStorage.getItem("userID")));

                    // setDescription(data.results.description);
                    // setCity(data.results.city);
                    // setProvince(data.results.province);
                    // setPhoneNumber(data.results.phone_number);
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };

        fetchData();
    }, [shelterID, navigate]);

    return (
        <>
            <main className="px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16 h-full">
                <div className="bg-[#F2F5FD] w-full">
                    <div className="rounded-2xl flex flex-col overflow-hidden gap-4">
                        <div className="bg-secondary flex flex-row justify-between items-center h-12 px-4 sm:px-12">
                            <p class="text-text text-xl font-semibold">Update Account</p>
                            <Link to={`/shelterDetail/${shelterID}/`}>
                                <i className="uil uil-times text-text text-3xl"></i>
                            </Link>
                        </div>
                        <div className="flex flex-col px-6 sm:px-12 md:px-20 gap-6 pb-8">
                            <div className="flex flex-col gap-2">
                                <p className="max-sm:text-sm">Mission Statement:</p>
                                <textarea rows="5" className="w-full p-3 border border-secondary rounded-[7px] font-light resize-none max-sm:text-sm">
                                    {shelter?.description}
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShelterUpdate