import { useEffect, useState } from 'react'
import ShelterListings from '../../components/ShelterListings'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ajax_or_login } from '../../util/ajax';
import NewReview from '../../components/NewReview';
import AllReviews from '../../components/AllReviews';

const ShelterDetail = () => {
    const { shelterID } = useParams();
    const [id, setId] = useState(0);
    const [isSeeker, setIsSeeker] = useState(null);
    const [isSelf, setIsSelf] = useState(false);
    const [shelter, setShelter] = useState(null);
    const [avatar, setAvatar] = useState(null);
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
                } else {
                    console.error("Error during fetch: ", res);
                }
            } catch (error) {
                console.error("Error during fetch: ", error);
            }
        };
        fetchData();
    }, [shelterID, navigate]);

    useEffect(() => {
        setIsSelf(!isSeeker && id === shelterID);
        setAvatar(localStorage.getItem("avatar"));
    }, [isSeeker, id, shelterID, avatar]);

    const formattedPhoneNumber = (phoneNumber) => {
        const phoneNumberString = phoneNumber.toString();

        const areaCode = phoneNumberString.slice(0, 3);
        const firstPart = phoneNumberString.slice(3, 6);
        const secondPart = phoneNumberString.slice(6, 10);

        return `(${areaCode}) ${firstPart} - ${secondPart}`;
    };

    return (
        <>
            <main className="h-full">
                <div className="w-full gap-14 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    <Link
                        to={`/shelter/all/`}
                        className="text-primary flex items-center hover:text-accent-100 w-max hover:scale-105 duration-200 active:scale-95">
                        <i className="uil uil-angle-left text-3xl"></i>All Shelters
                    </Link>
                    <div className="w-full flex flex-col gap-11 justify-center mb-[90px]">
                        <div className="bg-[#FAFAFA] rounded-[30px] flex flex-col overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
                            <div className="bg-primary h-[80px] sm:h-[110px] text-center flex justify-center items-center">
                                {shelter ? <p className="text-background text-xl sm:text-4xl md:text-5xl font-bold">{shelter.account.name}</p> : <p className="text-background text-2xl sm:text-4xl md:text-5xl font-bold"></p>}
                            </div>
                            <div className="flex flex-col items-center gap-6 p-6 sm:p-10 md:flex-row md:items-center md:gap-10">
                                {/* Avatar */}
                                <div className="shrink-0">
                                    <div className="rounded-3xl overflow-hidden aspect-square w-40 sm:w-48 md:w-52 ring-1 ring-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                                        {shelter ? <img
                                            src={shelter.account.avatar}
                                            className="object-center object-cover w-full h-full"
                                            alt="Shelter Avatar" /> : <></>}
                                    </div>
                                </div>
                                {/* Info */}
                                <div className="flex flex-col gap-3 w-full text-center md:text-left">
                                    <div className="flex flex-row gap-3 items-center justify-center md:justify-start">
                                        <p className="text-primary text-2xl sm:text-3xl font-semibold">Our Mission</p>
                                        {isSelf === true ?
                                            <Link
                                                to={`/shelter/${shelterID}/edit/`}
                                                className="text-primary hover:text-accent-100 duration-200">
                                                <i className="uil uil-edit text-xl"></i>
                                            </Link>
                                            :
                                            <></>
                                        }
                                    </div>
                                    {shelter ? <p className="text-[#1E1E1E] text-sm sm:text-base font-light">{shelter.description}</p> : <p></p>}
                                    <div className="border-t border-text/30 my-1"></div>
                                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 justify-center md:justify-start">
                                        {shelter ? <p className="text-text text-xs sm:text-sm font-semibold">{shelter.city}, {shelter.province}</p> : <p></p>}
                                        <div className="flex flex-row items-center gap-1.5">
                                            <i className="uil uil-envelope text-base sm:text-lg text-primary"></i>
                                            {shelter ? <p className="text-text text-xs sm:text-sm font-semibold">{shelter.account.email}</p> : <p></p>}
                                        </div>
                                        <div className="flex flex-row items-center gap-1.5">
                                            <i className="uil uil-phone-alt text-base sm:text-lg text-primary"></i>
                                            {shelter ? <p className="text-text text-xs sm:text-sm font-semibold">{formattedPhoneNumber(shelter.phone_number)}</p> : <p></p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full gap-14 flex flex-col">
                    <div className="w-full flex flex-col justify-center bg-background gap-14 pb-14 px-mobile md:px-tablet xl:px-desktop">
                        <div className="flex justify-center md:justify-start">
                            {shelter ? <p className="text-primary text-[32px] mt-14 font-medium text-center sm:text-left">Pets from {shelter.account.name}</p> : <p></p>}
                        </div>
                        <div className="flex flex-col md:flex-row justify-center gap-14 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-[78px]">
                            <ShelterListings key={id} shelterName={shelter?.account.name} />
                        </div>
                        <div className="flex justify-center">
                            {isSelf === true ?
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to={`/mylistings/`}
                                        className="rounded-[30px] bg-accent-100 px-5 py-3 text-sm sm:px-16 sm:py-6 text-white sm:text-lg md:text-2xl font-semibold justify-center text-center hover:scale-105 duration-200">View your pets</Link>
                                    <Link
                                        to={`/applications/list/shelter/`}
                                        className="rounded-[30px] bg-accent-100 px-5 py-3 text-base sm:px-16 sm:py-6 text-white sm:text-lg md:text-2xl font-semibold justify-center text-center hover:scale-105 duration-200">View your applications</Link>
                                    <Link
                                        to={`/blogs/create/`}
                                        className="rounded-[30px] bg-accent-100 px-5 py-3 text-base sm:px-16 sm:py-6 text-white sm:text-lg md:text-2xl font-semibold justify-center text-center hover:scale-105 duration-200">Make a blog post
                                    </Link>
                                </div>
                                :
                                <Link
                                    to={`/petlistings?shelter=${shelter?.account.name}`}
                                    className="rounded-[30px] bg-accent-100 px-9 py-4 text-base sm:px-16 sm:py-6 text-white sm:text-lg md:text-2xl font-semibold justify-center text-center hover:scale-105 duration-200">View our pets</Link>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full gap-14 flex flex-col px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
                    <div className="w-full flex flex-col justify-center bg-[#FAFAFA] rounded-[30px] shadow-[0_6px_20px_rgba(0,0,0,0.10)] px-8 md:px-24 py-16 gap-6">
                        <div className="flex flex-col gap-5 sm:gap-8">
                            {isSelf ?
                                <></>
                                :
                                <div className="flex flex-col">
                                    <p className="text-text text-xl sm:text-2xl font-bold mb-3">Leave a Review</p>
                                    <div className="border-t border-black/10 mb-5"></div>
                                    <NewReview key={id} img={avatar}></NewReview>
                                </div>
                            }
                            <div className="flex flex-col">
                                <p className="text-text text-xl sm:text-2xl font-bold mb-3">All Reviews</p>
                                <div className="border-t border-black/10 mb-5"></div>
                                <AllReviews key={shelterID} name="reviews" shelterID={shelterID} isSelf={isSelf}></AllReviews>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShelterDetail