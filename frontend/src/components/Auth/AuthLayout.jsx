import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import heroBanner from '../../assets/images/Home/heroBanner.jpg';

/**
 * Split-panel shell for the auth pages: a branded image panel on the left
 * (hidden on small screens) and the form content on the right.
 */
const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <main className="relative flex items-center px-mobile md:px-tablet xl:px-desktop py-10 sm:py-20 bg-background">
            <div className="relative mx-auto w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(40,60,130,0.18)] ring-1 ring-black/5 grid grid-cols-1 md:grid-cols-2 items-stretch">
                {/* Brand panel */}
                <div className="relative hidden md:flex flex-col">
                    <img
                        src={heroBanner}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/70" />
                    <div className="relative flex-grow flex flex-col justify-between p-10 text-white">
                        <Link to="/" className="flex items-center gap-2.5 w-max">
                            <span className="flex items-center justify-center bg-white rounded-xl p-2 shadow-sm">
                                <img src={logo} alt="" className="h-7 w-7 object-contain" />
                            </span>
                            <span className="text-xl font-bold text-white tracking-tight">PetPal</span>
                        </Link>
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                                Find your new best friend.
                            </h2>
                            <p className="mt-3 text-[#FAFAFA]/80 text-sm lg:text-base max-w-xs">
                                Connect with trusted shelters and give a pet a loving home.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form panel */}
                <div className="flex flex-col justify-center p-8 sm:p-12">
                    <div className="w-full max-w-md mx-auto">
                        <h1 className="text-3xl sm:text-4xl font-bold text-text">{title}</h1>
                        {subtitle && <p className="mt-2 text-text/60">{subtitle}</p>}
                        <div className="mt-8">{children}</div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;
