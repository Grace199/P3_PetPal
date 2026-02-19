import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ajax_or_login } from '../../../util/ajax';
import { useNavigate } from 'react-router-dom';
import FieldError from "../../../components/FieldError";

function Index() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        residence_type: null,
        fenced_yard: null,
        pool: null,
        current_pets: null,
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
        questions: null,

        detail: null
    });

    useEffect(() => {
        setErrors({});
    }, [navigate]);


    const [formData, setFormData] = useState({
        residence_type: null,
        fenced_yard: null,
        pool: null,
        current_pets: null,
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

    const { petlistingID } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        
        const res = await ajax_or_login(`/applications/seeker/application/${petlistingID}/`, requestOptions, navigate);

        const data = await res.json();
        if (!res.ok) {
            if ('detail' in data) {
                if (data.detail === "Not found.") {
                    setErrors("Invalid PetListing for Application");
                }
                else {
                    setErrors({...errors, detail: data.detail});
                }
            }
            setErrors(data);
        }
        else {
            navigate(`/applications/update/seeker/${data.id}`)
        }

    };

    return <>
            <main className="px-mobile md:px-tablet xl:px-desktop py-10">
                {/* Form Start */}
                <form className="flex flex-col justify-center gap-10 sm:gap-20">
                    {/* Page Heading  */}
                    <div className="flex flex-col items-center">
                    <div
                        className="flex flex-col place-items-center rounded-3xl bg-primary w-5/6 md:w-5/6"
                    >
                        <div>
                        <p className="pt-6 pb-2 text-lg md:text-5xl text-white font-semibold">
                            PETPAL Application
                        </p>
                        </div>
                        <div>
                        <p
                            className="text-center text-xs font-thin md:font-normal md:text-base text-white px-10 pb-6"
                        >
                            adopt your fur-ever friends
                        </p>
                        </div>
                    </div>
                    </div>
                    {/* wrapper for step label and sub-form (Contact Information) */}
                    <div className="flex flex-col items-center">
                    {/* label for sub-form  */}
                    <div className="w-full sm:px-12">
                        <label htmlFor="CI_sub_form" className="text-center text-xs md:text-sm text-slate-500">Step 1 of 4</label>
                    </div>
                    {/* Sub-Form (Contact Information) */}
                    <div id="CI_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields */}
                        <div className="w-full sm:px-12">
                        {/* label  */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 sm:font-semibold sm:text-base sm:px-3 sm:py-2 text-black"
                            >
                                Contact Information
                            </p>
                            </div>
                        </div>
                        {/* fields  */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields  */}
                            <div
                            className="w-full grid gap-2 grid-cols-1 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for address input label and input field  */}
                            <div className="w-full">
                                <label
                                htmlFor="CI_address"
                                className="text-xs font-thin sm:text-sm text-black"
                                >Address:</label>
                                <input
                                onChange={handleInputChange}
                                name="address"
                                id="CI_address"
                                type="text"
                                className="w-full text-xs sm:text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs placeholder:font-thin sm:placeholder:test-sm"
                                placeholder="Your home address"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.address} />
                            
                            {/* wrapper for city input label and input field  */}
                            <div className="w-full">
                                <label
                                htmlFor="CI_city"
                                className="text-xs font-thin sm:text-sm text-black"
                                >City:</label>
                                <input
                                onChange={handleInputChange}
                                name="city"
                                id="CI_city"
                                type="text"
                                className="w-full text-xs sm:text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs placeholder:font-thin sm:placeholder:test-sm"
                                placeholder="e.g Toronto"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.city} />

                            {/* wrapper for postal code input label and input field  */}
                            <div className="w-full">
                                <label
                                htmlFor="CI_postal_code"
                                className="text-xs font-thin sm:text-sm text-black"
                                >Postal Code:</label>
                                <input
                                onChange={handleInputChange}
                                name="postal_code"
                                id="CI_postal_code"
                                type="text"
                                className="w-full text-xs sm:text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.postal_code} />

                            {/* wrapper for phone number input label and input field  */}
                            <div className="w-full">
                                <label
                                htmlFor="CI_phone_number"
                                className="text-xs font-thin sm:text-sm text-black"
                                >Phone Number:</label>
                                
                                <input
                                onChange={handleInputChange}
                                name="phone_number"
                                id="CI_phone_number"
                                type="text"
                                className="w-full text-xs sm:text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.phone_number} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Housing and Household) */}
                    <div className="flex flex-col items-center">
                    {/* label for sub-form  */}
                    <div className="w-full sm:px-12">
                        <label
                        htmlFor="HH_sub_form"
                        className="text-center text-xs md:text-sm text-slate-500"
                        >Step 2 of 4</label>
                    </div>
                    {/* Sub-Form (Housing and Household) */}
                    <div id="HH_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields */}
                        <div className="w-full sm:px-12">
                        {/* label  */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 sm:font-semibold sm:text-base sm:px-3 sm:py-2 text-black"
                            >
                                Housing and Household
                            </p>
                            </div>
                        </div>
                        {/* fields  */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields  */}
                            <div
                            className="w-full grid gap-2 grid-cols-1 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for resident radio group input label and radio buttons  */}
                            <div className="w-full">
                                {/* wrapper label for radio button group */}
                                <div className="text-center sm:text-left sm:pb-2">
                                <label
                                    htmlFor="HH_residence_grid"
                                    className="font-thin text-xs sm:text-sm md:text-base text-black"
                                    >What type of residence are you living in?</label>
                                
                                </div>
                                {/* grid for radio buttons */}
                                <div
                                id="HH_residence_grid"
                                type="text"
                                className="grid grid-flow-row grid-cols-1 gap-1"
                                >
                                {/* wrapper for Apartment choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_residence_aptartment"
                                    className="form-radio h-3 w-3"
                                    name="residence_type"
                                    value="apartment"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_residence_aptartment"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >Apartment</label>
                                    
                                </div>
                                {/* wrapper for Condominium choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_residence_condominium"
                                    className="form-radio h-3 w-3"
                                    name="residence_type"
                                    value="condominium"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_residence_condominium"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >Condominium</label>
                                    
                                </div>
                                {/* wrapper for Townhouse choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_residence_townhouse"
                                    className="form-radio h-3 w-3"
                                    name="residence_type"
                                    value="townhouse"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_residence_townhouse"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >Townhouse</label>
                                    
                                </div>
                                {/* wrapper for House choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_residence_house"
                                    className="form-radio h-3 w-3"
                                    name="residence_type"
                                    value="house"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_residence_house"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >House</label>
                                    
                                </div>
                                {/* wrapper for Other choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_residence_other"
                                    className="form-radio h-3 w-3"
                                    name="residence_type"
                                    value="other"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_residence_other"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >Other (please specify)</label>
                                    
                                </div>
                                <FieldError fielderror={errors?.residence_type} />
                                {/* text box for Other  */}
                                <div
                                    className="flex flex-row items-start px-2 sm:px-5 ml-0 sm:ml-6"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    name="other"
                                    type="text"
                                    className="w-full text-sm px-2 py-1 sm:py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                    />
                                </div>
                                </div>
                            </div>

                            {/* wrapper for yard radio group input label and radio buttons  */}
                            <div className="w-full">
                                {/* wrapper label for radio button group */}
                                <div className="text-center sm:text-left pb-2">
                                <label
                                    htmlFor="HH_yard_grid"
                                    className="font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Do you have securely fenced yard?</label>
                                
                                </div>
                                {/* grid for radio buttons */}
                                <div
                                id="HH_yard_grid"
                                type="text"
                                className="grid grid-rows-2 grid-cols-1 gap-1"
                                >
                                {/* wrapper for Yes choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_yard_yes"
                                    className="form-radio h-3 w-3"
                                    name="fenced_yard"
                                    value="yes"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_yard_yes"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >Yes</label>
                                   
                                </div>
                                {/* wrapper for No choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_yard_no"
                                    className="form-radio h-3 w-3"
                                    name="fenced_yard"
                                    value="no"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_yard_no"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >No</label>
                                   
                                </div>
                                </div>
                                <FieldError fielderror={errors?.fenced_yard} />
                            </div>

                            {/* wrapper for pool radio group input label and radio buttons  */}
                            <div className="w-full">
                                {/* wrapper label for radio button group */}
                                <div className="text-center sm:text-left pb-2">
                                <label
                                    htmlFor="HH_pool_grid"
                                    className="font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Do you have a pool?</label>
                                
                                </div>
                                {/* grid for radio buttons */}
                                <div
                                id="HH_pool_grid"
                                type="text"
                                className="grid grid-rows-2 grid-cols-1 gap-1"
                                >
                                {/* wrapper for Yes choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_pool_yes"
                                    className="form-radio h-3 w-3"
                                    name="pool"
                                    value="yes"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_pool_yes"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >Yes</label>
                                </div>
                                {/* wrapper for No choice radio button and label  */}
                                <div
                                    className="flex flex-row justify-start px-2 sm:px-5 w-full items-center"
                                >
                                    <input
                                    onChange={handleInputChange}
                                    type="radio"
                                    id="HH_pool_no"
                                    className="form-radio h-3 w-3"
                                    name="pool"
                                    value="no"
                                    required
                                    />
                                    <label
                                    htmlFor="HH_pool_no"
                                    className="text-center text-[10px] sm:text-sm pl-2"
                                    >No</label>
                                    
                                </div>
                                </div>
                            </div>
                            <FieldError fielderror={errors?.pool} />

                            {/* wrapper for number of children input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="HH_num_children"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Number of children in the house:</label>
                                
                                </div>
                                <input
                                onChange={handleInputChange}
                                name="children"
                                id="HH_num_children"
                                type="text"
                                className="w-full text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.children} />
                            {/* wrapper for number of younger children input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="HH_num_children_13"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Number of children in the house, 13 and under:</label>
                                
                                </div>
                                <input
                                onChange={handleInputChange}
                                name="children_under_13"
                                id="HH_num_children_13"
                                type="number"
                                className="w-full text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.children_under_13} />
                            {/* wrapper for number and type of pets input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="HH_num_type_pets"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Number and type of current pets in the home:</label>
                                
                                </div>
                                <input
                                onChange={handleInputChange}
                                name="current_pets"
                                id="HH_num_type_pets"
                                type="text"
                                className="w-full text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                required
                                />
                            </div>
                            <FieldError fielderror={errors?.current_pets} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Pet Questions) */}
                    <div className="flex flex-col items-center">
                    {/* label for sub-form  */}
                    <div className="w-full sm:px-12">
                        <label
                        htmlFor="PQ_sub_form"
                        className="text-center text-xs md:text-sm text-slate-500"
                        >Step 3 of 4</label>
                        
                    </div>
                    {/* Sub-Form (Pet Questions) */}
                    <div id="PQ_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields */}
                        <div className="w-full sm:px-12">
                        {/* label  */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 md:font-semibold md:text-base md:px-3 md:py-2 text-black"
                            >
                                Pet Questions
                            </p>
                            </div>
                        </div>
                        {/* fields  */}
                        <div className="flex items-center rounded-md bg-background">
                            {/* grid for fields  */}
                            <div
                            className="w-full grid grid-flow-auto grid-cols-1 gap-4 sm:gap-8 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for good fit input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="PQ_good_fit"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Why would this pet be a good fit for your
                                    family?</label>
                                
                                </div>
                                <textarea
                                onChange={handleInputChange}
                                name="good_fit"
                                id="PQ_good_fit"
                                className="text-start align-top resize-none w-full text-sm px-3 py-2 h-40 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                required
                                ></textarea>
                            </div>
                            <FieldError fielderror={errors?.good_fit} />
                            {/* wrapper for schedule label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="AI_schedule"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Explain how you will manage maintenance/training of
                                    your pet in your current schedule:</label>
                                
                                </div>
                                <textarea
                                onChange={handleInputChange}
                                name="schedule"
                                id="AI_schedule"
                                className="text-start align-top resize-none w-full text-sm px-3 py-2 h-40 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                required
                                ></textarea>
                            </div>
                            <FieldError fielderror={errors?.schedule} />
                            {/* wrapper for insurance input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="PQ_insurance"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >What are your thoughts on Pet Insurance?</label>
                                
                                </div>
                                <textarea
                                onChange={handleInputChange}
                                name="insurance"
                                id="PQ_insurance"
                                className="text-start align-top resize-none w-full text-sm px-3 py-2 h-40 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                                required
                                ></textarea>
                            </div>
                            <FieldError fielderror={errors?.insurance} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for step label and sub-form (Additional Information) */}
                    <div className="flex flex-col items-center">
                    {/* label for sub-form  */}
                    <div className="w-full sm:px-12">
                        <label
                        htmlFor="AI_sub_form"
                        className="text-center text-xs md:text-sm text-slate-500"
                        >Step 4 of 4</label>
                        
                    </div>
                    {/* Sub-Form (Additional Information) */}
                    <div id="AI_sub_form" className="w-full flex flex-col items-center">
                        {/* wrapper for sub-form label and fields */}
                        <div className="w-full sm:px-12">
                        {/* label  */}
                        <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
                            <div>
                            <p
                                className="text-xs font-thin px-2 py-1 md:font-semibold md:text-base md:px-3 md:py-2 text-black"
                            >
                                Additional Information
                            </p>
                            </div>
                        </div>
                        {/* fields  */}
                        <div className="flex center rounded-md bg-background">
                            {/* grid for fields  */}
                            <div
                            className="w-full grid grid-flow-auto grid-cols-1 gap-8 px-4 md:px-12 py-8 md:py-12"
                            >
                            {/* wrapper for references input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="AI_references"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Please list three 3 pet references with phone
                                    numbers, other than your vet or immediate family
                                    members:</label>
                                
                                </div>
                                <textarea
                                onChange={handleInputChange}
                                name="references"
                                id="AI_references"
                                rows="4"
                                className="w-full text-sm px-3 py-3 sm:py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 resize-none"
                                required
                                ></textarea>
                            </div>
                            <FieldError fielderror={errors?.references} />
                            {/* wrapper for veterinarian label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="AI_veterinarian"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Who is your veterinarian and what is their phone
                                    number?</label>
                                
                                </div>
                                <textarea
                                onChange={handleInputChange}
                                name="vet"
                                id="AI_veterinarian"
                                rows="4"
                                className="w-full text-sm px-3 py-3 sm:py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 resize-none"
                                required
                                ></textarea>
                            </div>
                            <FieldError fielderror={errors?.vet} />
                            {/* wrapper for questions input label and input field  */}
                            <div className="w-full">
                                <div className="text-center sm:text-left">
                                <label
                                    htmlFor="AI_questions"
                                    className="pb-0 font-thin text-xs sm:text-sm md:text-base text-black"
                                    >Questions and concerns for the shelter:</label>
                                
                                </div>
                                <textarea
                                onChange={handleInputChange}
                                name="questions"
                                id="AI_questions"
                                rows="4"
                                className="text-start align-top w-full text-sm px-3 py-2 h-40 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 resize-none"
                                required
                                ></textarea>
                            </div>
                            <FieldError fielderror={errors?.questions} />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for cancel and submit buttons  */}
                    <div
                    className="flex flex-col gap-5 sm:gap-10 sm:flex-row justify-center items-center"
                    >
                    <div className="flex">
                        <a
                        href="../petDetail/petDetail.html"
                        name="button_cancel"
                        className="rounded-xl bg-red-400 px-2 sm:px-12 py-2 sm:py-3 text-white text-base font-semibold login_button justify-center text-center hover:scale-105 duration-200"
                        >Cancel</a>
                    </div>
                    <div className="flex">
                        <button
                        onClick={handleSubmit}
                        name="button_submit"
                        className="rounded-xl bg-accent-100 px-2 sm:px-12 py-2 sm:py-3 text-white text-base font-semibold login_button justify-center text-center hover:scale-105 duration-200"
                        >Submit</button>
                    </div>
                    </div>
                    <div className="flex justify-center">
                            <p className="font-semibold text-xs sm:text-sm text-red-500">{errors.detail}</p>
                    </div>
                </form>
            </main>
    </>;
}       

export default Index