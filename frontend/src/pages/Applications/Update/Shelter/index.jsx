import React, { useEffect } from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ajax_or_login } from '../../../../util/ajax';
import { Link, useNavigate } from 'react-router-dom';

function Index() {
    const [error, setError] = useState("");
    const [statusChange, setStatusChange] = useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        seeker: null,
        shelter: null,
        petlisting: null,

        residence_type: null,
        fenced_yard: null,
        pool: null,
        status: null,

        current_pets: null,
        pet_ages: null,
        address: null,
        city: null,
        postal_code: null,
        phone_number: null,
        other: null,

        children: null,
        children_under_13: null,

        good_fit: null,
        schedule: null,
        insurance: null,
        references: null,
        vet: null,
        questions: null
    });

    const { applicationID } = useParams();

    async function handleStatusChange(e) {
        e.preventDefault();

        const postRequestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "status": e.target.value
            })
        };
        
        const res = await ajax_or_login(`/applications/shelter/${applicationID}/`, postRequestOptions, navigate);

        if (!res.ok) {
            const data = await res.json();
            if ('detail' in data) {
                if (data.detail === "Not found.") {
                    setError("Invalid Application");
                }
                else {
                    setError(data.detail);
                }
            }
        }
        else {
            navigate("./")
            setFormData({...FormData, status: e.target.value});
            if (e.target.value === "accepted") {
                setStatusChange("Application Accepted Successfully");
            }
            else if (e.target.value === "denied") {
                setStatusChange("Application Denied Successfully");
            }
        }

    };

    useEffect(() => {
        const getRequestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const fetchData = async () => {
          try {
            const response = await ajax_or_login(`/applications/shelter/${applicationID}/`, getRequestOptions, navigate);
            const result = await response.json();
            setFormData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [applicationID, navigate, formData?.status]);

    

    return <>
            <main className="px-mobile md:px-tablet xl:px-desktop py-10">
                {/* Form Start*/}
                <form className="flex flex-col justify-center gap-20">
                    {/* Page Heading */}
                    <div className="flex flex-col items-center">
                    <div
                        className="flex flex-col place-items-center rounded-3xl bg-primary w-5/6 md:w-5/6"
                    >
                        <div>
                        <p
                            className="py-10 text-xl text-center md:text-5xl text-white font-semibold"
                        >
                            Seeker Application
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Contact Information)*/}
                    <div className="flex flex-col items-center">
                    {/* Sub-Form (Application Information)*/}
                    <div id="CI_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields*/}
                        <div className="w-full">
                        {/* label */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 sm:font-semibold sm:text-base sm:px-3 sm:py-2 text-black"
                            >
                                Application Information
                            </p>
                            </div>
                        </div>
                        {/* fields */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields */}
                            <div
                            className="w-full grid grid-rows-2 grid-cols-1 gap-4 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for pet name */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Pet:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                {formData?.petlisting?.pet?.name}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for status */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Status:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.status}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>



                    {/* wrapper for step label and sub-form (Contact Information)*/}
                    <div className="flex flex-col items-center">
                    {/* Sub-Form (Contact Information)*/}
                    <div id="CI_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields*/}
                        <div className="w-full">
                        {/* label */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 sm:font-semibold sm:text-base sm:px-3 sm:py-2 text-black"
                            >
                                Contact Information
                            </p>
                            </div>
                        </div>
                        {/* fields */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields */}
                            <div
                            className="w-full grid grid-rows-6 grid-cols-1 gap-4 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for full name label and static response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Full Name: 
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                {formData?.seeker?.account?.name}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for email label and static response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Email:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                {formData?.seeker?.account?.name}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for address label and static response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Address:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.address}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for city label and static response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    City:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                {formData?.city}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for postal code label and static response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Postal Code:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.city}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for phone number label and static response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Phone Number:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.phone_number}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Housing and Household)*/}
                    <div className="flex flex-col items-center">
                    {/* Sub-Form (Housing and Household)*/}
                    <div id="HH_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields*/}
                        <div className="w-full">
                        {/* label */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div className="text-center sm:text-left">
                            <p
                                className="text-xs font-thin px-2 py-1 md:font-semibold md:text-base md:px-3 md:py-2 text-black"
                            >
                                Housing and Household
                            </p>
                            </div>
                        </div>
                        {/* fields */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields */}
                            <div
                            className="w-full grid grid-flow-row grid-cols-1 gap-8 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for resident radio group input label and radio buttons */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    What type of residence are you living in?:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.residence_type}
                                </p>
                                </div>
                            </div>

                            {/* wrapper for yard label and response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Do you have securely fenced yard?
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.fenced_yard}
                                </p>
                                </div>
                            </div>
                           
                            {/* wrapper for pool label and response */}
                            <div className="w-full">
                                <div>
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Do you have a pool?
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.pool}
                                </p>
                                </div>
                            </div>

                            {/* wrapper for number of children label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Number of children in the house:
                                </p>
                                </div>
                                <div>
                                <p
                                    className="px-2 text-xs text-center sm:text-left md:text-sm text-slate-500"
                                >
                                    {formData?.children}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for number of younger children label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Number of children in the house, 13 and under:
                                </p>
                                </div>
                                <div>
                                <p
                                    className="px-2 text-xs text-center sm:text-left md:text-sm text-slate-500"
                                >
                                    {formData?.children_under_13}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for number and type of pets label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Number and type of current pets in the home:
                                </p>
                                </div>
                                <div>
                                <p
                                    className="px-2 text-xs text-center sm:text-left md:text-sm text-slate-500"
                                >
                                    {formData?.current_pets}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Pet Questions)*/}
                    <div className="flex flex-col items-center">
                    {/* Sub-Form (Pet Questions)*/}
                    <div id="PQ_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields*/}
                        <div className="w-full">
                        {/* label */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div className="text-center sm:text-left">
                            <p
                                className="text-xs font-thin px-2 py-1 md:font-semibold md:text-base md:px-3 md:py-2 text-black"
                            >
                                Pet Questions
                            </p>
                            </div>
                        </div>
                        {/* fields */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields */}
                            <div
                            className="w-full grid grid-flow-auto grid-cols-1 gap-8 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for good fit label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Why would this pet be a good fit for your family?
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.good_fit}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for schedule label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Explain how you will manage maintenance/training of your
                                    pet in your current schedule:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.schedule}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for insurance label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    What are your thoughts on Pet Insurance?
                                </p>
                                </div>
                                <div className="sm:text-left">
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.insurance}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Additional Information)*/}
                    <div className="flex flex-col items-center">
                    {/* Sub-Form (Additional Information)*/}
                    <div id="AI_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields*/}
                        <div className="w-full">
                        {/* label */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 md:font-semibold md:text-base md:px-3 md:py-2 text-black"
                            >
                                Additional Information
                            </p>
                            </div>
                        </div>
                        {/* fields */}
                        <div className="flex center rounded-md bg-background">
                            {/* grid for fields */}
                            <div
                            className="w-full grid grid-flow-auto grid-cols-1 gap-8 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for references label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Please list three (3) pet references with phone numbers,
                                    other than your vet or immediate family members:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                   {formData?.references}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for veterinarian label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Who is your veterinarian and what is their phone number?
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.vet}
                                </p>
                                </div>
                            </div>
                            {/* wrapper for questions label and static response */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <p className="py-2 text-xs text-thin md:text-base text-black">
                                    Questions and concerns for the shelter:
                                </p>
                                </div>
                                <div>
                                <p className="px-2 text-xs md:text-sm text-slate-500">
                                    {formData?.questions}
                                </p>
                                </div>
                            </div>

                        
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>


                    {/* wrapper for status changing buttons */}
                    <div className="w-full flex flex-row justify-center items-center gap-3">
                    <div className="flex">
                        <Link
                        to="/applications/list/shelter/"
                        name="button_submit"
                        className="rounded-xl bg-accent-100 px-4 sm:px-12 py-2 sm:py-3 text-white text-lg font-semibold login_button justify-center text-center hover:scale-105 duration-200"
                        >Return</Link>
                    </div>
                    <>
                        {formData?.status === "pending" ? (
                            <>
                            <div className="flex">
                            <button
                            onClick={handleStatusChange}
                            value="accepted"
                            name="button_submit"
                            className="rounded-xl bg-green-400 px-2 sm:px-12 py-2 sm:py-3 text-white text-base font-semibold login_button justify-center text-center hover:scale-105 duration-200"
                            >Accept Application</button>
                            </div>
                            <div className="flex">
                            <button
                            onClick={handleStatusChange}
                            value="denied"
                            name="button_submit"
                            className="rounded-xl bg-red-400 px-2 sm:px-12 py-2 sm:py-3 text-white text-base font-semibold login_button justify-center text-center hover:scale-105 duration-200"
                            >Deny Application</button>
                            </div>
                            </>
                        ) : null}
                    </>
                    </div>
                    <div className="flex justify-center">
                            <p className="font-semibold text-xs sm:text-sm text-green-500">{statusChange}</p>
                    </div>
                    <div className="flex justify-center">
                            <p className="font-semibold text-xs sm:text-sm text-red-500">{error}</p>
                    </div>
                </form>
            </main>
    </>;
}       

export default Index