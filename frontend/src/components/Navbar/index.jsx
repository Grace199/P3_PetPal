import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import hamburger from '../../assets/images/hamburger.svg'
import cross from '../../assets/images/cross.svg'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { ajax_or_login } from '../../util/ajax';

const Index = () => {
    const [openNav, setOpenNav] = useState(false);
    const { id, setId } = useContext(UserContext);
    const [avatar, setAvatar] = useState(
        localStorage.getItem('avatar') || null,
    )
    const [isSeeker, setIsSeeker] = useState(null);
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (id !== -1) {
                const isSeeker = JSON.parse(localStorage.getItem("isSeeker"));
                const apiUrl = `/accounts/${isSeeker ? 'seeker' : 'shelter'}/${id}/`;
                const res = await ajax_or_login(apiUrl, {
                    method: "GET",
                }, navigate);

                if (res.ok) {
                    const data = await res.json();
                    setAvatar(data.account.avatar);
                    localStorage.setItem('avatar', data.account.avatar);
                    setIsSeeker(isSeeker);
                }
            }
            setId(parseInt(localStorage.getItem("userID")));
        }

        fetchData();
    }, [id, navigate]);

    function handleLogout() {
        localStorage.removeItem('avatar');
        localStorage.removeItem('access');
        localStorage.removeItem('isSeeker');
        setId(-1);
        setIsSeeker(null);
        setAvatar(null);
        navigate("/login/");
    }

    return (
        <header className="sticky bg-background w-full z-40 top-0">
            <nav
                className="w-full flex justify-between py-3 px-mobile md:px-tablet xl:px-desktop max-md:pt-10 shadow-sm"
            >
                <Link to="/">
                    <img
                        src={logo}
                        className="h-12 hover:scale-105 hover:rotate-6 duration-200"
                        alt="PetPal logo"
                    />
                </Link>
                <div className="gap-5 justify-center items-center hidden md:flex">
                    {
                        avatar &&

                        <>
                            <Link to="/chatroom/" className='hover:scale-105 hover:rotate-6 duration-100'>
                                <i className="uil uil-chat text-2xl"></i>
                            </Link>

                            <Link to="/notifications/" className="relative group" id="notification__pulse">
                                <div className="group-hover:scale-105 group-hover:rotate-6 duration-100">
                                    <i className="uil uil-bell text-3xl"></i>
                                </div>
                                <div className="absolute top-0 -right-1" id="notification__pulse">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                </div>
                            </Link>


                            {
                                isSeeker ?
                                    (
                                        <Link to="/applications/list/seeker/" className="text-base hover:text-secondary hover:scale-105">My Applications</Link>
                                    ) :
                                    (
                                        <Link to="/mylistings" className="text-base hover:text-secondary hover:scale-105">My Pets</Link>
                                    )
                            }
                        </>
                    }



                    <Link to="/blogs" className="text-base hover:text-secondary hover:scale-105">Blogs</Link>
                    <div className="bg-text w-[0.7px] h-3/4"></div>
                    {
                        avatar ? (<>
                            <div className="relative">
                                <button id="profile-menu-toggle" onClick={() => {
                                    setOpenProfileMenu(prev => !prev);
                                }}>
                                    <img src={avatar}
                                        alt='avatar'
                                        className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[35px] aspect-square object-cover" />
                                </button>
                                <div id="profile-dropdown-menu" className={`absolute flex-col mt-2 w-[200px] right-0 ${openProfileMenu ? 'flex' : 'hidden'}`}>
                                    <Link to={isSeeker ? "/seekerDetail" : `/shelterDetail/${id}/`}
                                        className="bg-white px-5 py-3 hover:bg-[#949494] rounded-t-lg">Manage Account</Link>
                                    <button className="bg-white px-5 py-3 hover:bg-[#949494] rounded-b-lg" onClick={handleLogout}>Sign Out</button>
                                </div>
                            </div>
                        </>) : (<>
                            <Link
                                to="/login"
                                className="py-3 px-6 border-text border rounded-3xl hover:bg-secondary hover:scale-105 duration-150"
                            >Login</Link>
                            <Link
                                to="/signup"
                                className="py-3 px-6 border-text border rounded-3xl bg-accent-100 hover:scale-105 text-background hover:bg-secondary hover:text-text duration-150"
                            >Sign up</Link>
                        </>)
                    }

                </div>
                <button className="md:hidden" id="menu-bar" onClick={() => setOpenNav(prev => !prev)}>
                    <img
                        src={hamburger}
                        alt="Hamburger bar open"
                        id="bar-open"
                        className={openNav ? 'hidden' : 'block'}
                    />
                    <img
                        src={cross}
                        alt="Hamburger bar closed"
                        id="bar-closed"
                        className={openNav ? 'block' : 'hidden'}
                    />
                </button>
            </nav>
            <div
                className={"w-full bg-secondary flex-col md:hidden justify-between z-40 absolute h-screen " + (openNav ? 'block' : 'hidden')}
                id="mobile_menu"
                onClick={() => { setOpenNav(false) }}
            >
                <div className="w-full flex flex-col">
                    <Link
                        to="/blogs"
                        className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                    >Blogs</Link>
                    {avatar ? (<>
                        <Link
                            className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                            to="/chatroom"
                        >Chats</Link>
                        <Link
                            className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                            to="/notifications"
                        >Notifications</Link>

                        {isSeeker ? (
                            <Link
                                className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                                to="/applications/list/seeker/"
                            >My Applications</Link>) : (
                            <Link
                                className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                                to="/mylistings"
                            >My Pets</Link>)}

                        <Link
                            className="w-full bg-[#c57f2f] p-8 text-xl text-background hover:bg-accent-200"
                            to={isSeeker ? "/seekerDetail" : `/shelterDetail/${id}/`}
                        >Manage Account</Link>
                        <button
                            className="w-full bg-[#b22626] p-8 text-xl text-background hover:bg-accent-200 text-left"
                            onClick={handleLogout}
                        >Sign Out</button>
                    </>) : (<>
                        <Link
                            className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                            to="/signup"
                        >Sign Up</Link>
                        <Link
                            className="w-full bg-primary p-8 text-xl text-background hover:bg-accent-200"
                            to="/login"
                        >Log In</Link>
                    </>)}
                </div>
            </div>
        </header>
    )
}

export default Index
