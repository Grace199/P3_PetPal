import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import FieldError from "../../../components/FieldError";
import { ajax } from '../../../util/ajax';

const Index = () => {
    const [errors, setErrors] = useState({
        email: null,
        password1: null,
        password2: null,
        address: null,
        city: null,
        province: null,
        phone_number: null,
        description: null
    });


    const [formData, setFormData] = useState({
        account: {
            email: null,
            name: null,
            password1: null,
            password2: null
        },
        address: null,
        city: null,
        province: null,
        phone_number: null,
        description: null
    });

    const navigate = useNavigate();

    const handleInputChangeForm = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeFormAccount = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, 
            account: {
            ...formData.account, [name]: value
            }
        });
    };
    

    function handle_submit(event) {

        const requestOptions = {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };

        fetch(`http://localhost:8000/accounts/shelter/signup/`, requestOptions)
        .then(response => {
            if (response.ok) {
                navigate("../../Login/");
                return Promise.reject("redirecting to login");
            }
            return response.json();
        })
        .then(json => {
            setErrors(prevErrors => ({
              ...prevErrors,
              email: null,
              password1: null,
              password2: null,
              phone_number: null,
            }));
            if ('account' in json) {
              if ('password1' in json.account) {
                setErrors(prevErrors => ({ ...prevErrors, password1: json.account.password1 }));
              }
              if ('password2' in json.account) {
                setErrors(prevErrors => ({ ...prevErrors, password2: json.account.password2 }));
              }
              if ('email' in json.account) {
                setErrors(prevErrors => ({ ...prevErrors, email: json.account.email }));
              }
            }
            if ('phone_number' in json) {
              setErrors(prevErrors => ({ ...prevErrors, phone_number: json.phone_number }));
            }

            if ('address' in json) {
                setErrors(prevErrors => ({ ...prevErrors, address: json.address }));
            }

            if ('city' in json) {
                setErrors(prevErrors => ({ ...prevErrors, city: json.city }));
            }

            if ('province' in json) {
                setErrors(prevErrors => ({ ...prevErrors, province: json.province }));
            }

            if ('description' in json) {
                setErrors(prevErrors => ({ ...prevErrors, description: json.description }));
            }

          })
          .catch(error => console.log(error));
        

        event.preventDefault();
    }

    return (
        <main className="px-mobile md:px-tablet xl:px-desktop pt-6 sm:pt-16">
      <div
        className="login-container bg-background rounded-2xl flex flex-col items-center pt-8 pb-6 md:items-start sm:pt-16 md:px-16"
      >
        {/* Sign Up big */}
        <div className="flex justify-center pb-8 md:justify-start">
          <p className="text-5xl w-full md:text-left">Sign Up</p>
        </div>
        {/* Make the form */}
        <form className="max-md:gap-6 gap-7 w-full flex justify-center">
          {/* Make the grid */}
          <div className="grid grid-cols-1 grid-rows-2 gap-5 w-full mx-8">

            {/* Name row */}
            <div className="w-full relative h-16" onChange={handleInputChangeFormAccount}>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="name"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Shelter Name</label>
              
            </div>
            
            {/* Email row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeFormAccount}
                required
                type="email"
                name="email"
                id="email"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="email"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Email</label>
            
            </div>
            <FieldError fielderror={errors.email} />

            {/* Password row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeFormAccount}
                required
                type="password"
                id="password1"
                name="password1"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="password1"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Password</label>
            </div>
            <FieldError fielderror={errors.password1} />

            {/* Password confirmation row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeFormAccount}
                required
                type="password"
                id="password2"
                name="password2"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="password2"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Confirm Password</label>
            </div>
            <FieldError fielderror={errors.password2} />

            {/* Address row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeForm}
                required
                type="text"
                id="address"
                name="address"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="address"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Address</label>
            </div>
            <FieldError fielderror={errors.address} />

            {/* City row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeForm}
                required
                type="text"
                id="city"
                name="city"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="city"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >City</label>
            </div>
            <FieldError fielderror={errors.city} />

            {/* Province row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeForm}
                required
                type="text"
                id="province"
                name="province"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="province"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Province</label>
            </div>
            <FieldError fielderror={errors.province} />

            {/* Phone number row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeForm}
                required
                type="text"
                id="phone_number"
                name="phone_number"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="phone_number"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Phone Number</label>
            </div>
            <FieldError fielderror={errors.phone_number} />

            {/* Description row */}
            <div className="w-full relative h-16">
              <input onChange={handleInputChangeForm}
                required
                type="text"
                id="description"
                name="description"
                className="absolute top-0 left-0 focus:outline-accent-100 text-xm text-accent-100 h-16 rounded-[5px] border-[#D2D1D3] border-[1px] w-full pt-5 px-5 text-lg font-semibold"
              />
              <label
                htmlFor="description"
                className="absolute text-gray-800 pointer-events-none top-0 left-0 px-2 py-1 text-sm"
                >Description</label>
            </div>
            <FieldError fielderror={errors.description} />


            {/* Sign up button row */}
            <div className="flex flex-row justify-center items-center">
                <button onClick={handle_submit} className="rounded-lg bg-primary px-8 py-3 text-lg text-white font-semibold justify-center hover:scale-105 duration-200 sm:px-16 sm:text-xl">
                    Create your free account</button>
            </div>
            {/* Redirect to login/shelter sign up row */}
            <div className="flex flex-row justify-center">
              <div>
                <p className="text-center text-sm">
                  Already have an account?
                  <Link to="../../Login/" className="text-accent-100 font-semibold"> Login</Link>
                  |Signing up as a seeker?
                  <Link to="/signup/seeker/" className="text-accent-100 font-semibold"> Sign Up</Link>
                </p>
              </div>
            </div>

            {/* Hidden error message */}
            <div className="invisible flex justify-center">
              <p className="text-sm">Error message</p>
            </div>
          </div>
        </form>
      </div>
    </main>
    )
}

export default Index