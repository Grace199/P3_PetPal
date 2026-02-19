import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ajax, ajax_or_login } from '../../util/ajax';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setId } = useContext(UserContext);

    function handle_submit(event) {
        let data = new FormData(event.target);

        ajax("/api/token/", {
            method: "POST",
            body: data,
        })
            .then(request => request.json())
            .then(json => {
                if ('access' in json) {
                    localStorage.setItem('access', json.access);
                    ajax_or_login('/currentuser/', {
                        method: 'GET',
                    }, navigate)
                        .then(response => response.json())
                        .then(userJson => {
                            localStorage.setItem('userID', userJson.id);
                            localStorage.setItem('isSeeker', userJson.is_seeker);
                            setId(userJson.id);
                            navigate('/');
                        })
                        .catch(error => {
                            console.error('Error fetching current user:', error);
                        });
                }
                else if ('detail' in json) {
                    setError("Invalid username and password combination.");
                }
                else {
                    setError("Invalid username and password combination.")
                }
            })
            .catch(error => {
                setError(error);
            });

        event.preventDefault();
    }

    return (
        <main className="px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
            <div className="login-container bg-background rounded-2xl flex flex-col items-center pt-8 pb-6 md:items-start sm:pt-16 md:px-16">
                <div className="flex justify-center pb-8 md:justify-start">
                    <p className="text-5xl w-full md:text-left">Login</p>
                </div>
                <form className="max-md:gap-6 gap-7 w-full flex justify-center" onSubmit={handle_submit}>
                    <div className="grid grid-cols-1 grid-rows-2 gap-5 w-full mx-8">
                        <div className="w-full relative h-16">
                            <input type="email" id="email" name="email" required className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-base sm:text-lg font-semibold" />
                            <label htmlFor="email" className="absolute text-gray-800 pointer-events-none top-0 left-0 px-3 py-2 text-xs sm:px-2 sm:py-1 sm:text-sm">Email</label>
                        </div>
                        <div className="w-full relative h-16">
                            <input type="password" id="password" name="password" required className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-base sm:text-lg font-semibold" />
                            <label htmlFor="password" className="absolute text-gray-600 pointer-events-none top-0 left-0 px-3 py-2 text-xs sm:px-2 sm:py-1 sm:text-sm">Password</label>
                        </div>
                        <div className="flex justify-center w-full">
                            <button className="rounded-lg bg-primary px-8 py-3 text-lg text-white font-semibold justify-center hover:scale-105 duration-200 sm:px-16 sm:text-xl">Login</button>
                        </div>
                        <div className="flex justify-center w-full">
                            <p className="text-center max-sm:text-sm">Don't have an account yet?<Link to="/signup/seeker/" className="text-accent-100 font-semibold"> Sign Up</Link></p>
                        </div>
                        <div className="flex justify-center">
                            <p className="font-semibold text-xs sm:text-sm text-red-500">{error}</p>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login