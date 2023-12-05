import { useState, useParams } from "react";

function Index() {
    const [formData, setFormData] = useState({
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

    const { petlistingID } = useParams();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        fetch(`https://localhost:8000/applications/seeker/application/${petlistingID}/`, requestOptions)
        .then(response => response.json())
        .then(json => console.log(json));
        console.log("hello");
    };

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
                            Your Application Response
                        </p>
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
                                    Mishu
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
                                    Mishu@gmail.com
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
                                    {address}
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
                                    {city}
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
                                    {postal_code}
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
                                    {phone_number}
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
                                    {residence_type}
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
                                    {fenced_yard}
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
                                    {pool}
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
                                    {children}
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
                                    {children_under_13}
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
                                    {current_pets}
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
                                    {good_fit}
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
                                    {schedule}
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
                                    {insurance}
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
                                   {references}
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
                                    {vet}
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
                                    {questions}
                                </p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* wrapper for return button */}
                    <div className="w-full flex flex-row justify-center items-center">
                    <div className="flex">
                        <a
                        href="../UserDetail/userApplicationsOverview.html"
                        name="button_submit"
                        className="rounded-xl bg-accent-100 px-4 sm:px-12 py-2 sm:py-3 text-white text-lg font-semibold login_button justify-center text-center hover:scale-105 duration-200"
                        >Return</a>
                    </div>
                    </div>
                </form>
            </main>
    </>;
}       

export default Index