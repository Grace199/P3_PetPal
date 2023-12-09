import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { ajax_or_login } from '../../util/ajax'

const Index = () => {
    
    return (
        <>
        <main className="px-mobile md:px-tablet xl:px-desktop py-10">
      {/* Form Start */}
      <form className="flex flex-col justify-center gap-20">
        {/* Page Heading */}
        <div className="flex flex-col items-center">
          <div
            className="flex flex-col place-items-center rounded-3xl bg-primary w-5/6"
          >
            <div>
              <p
                className="py-10 text-xl text-center md:text-5xl text-white font-semibold"
              >
                Update Pet
              </p>
            </div>
          </div>
        </div>
        {/* Sub-Form (Pet Details)*/}
        <div id="PD_sub_form" className="w-full flex flex-col items-center">
          {/* wrapper for sub-form label and fields*/}
          <div className="w-full">
            {/* label */}
            <div className="flex items-left rounded-t-xl bg-secondary md:px-5">
              <div>
                <p
                  className="text-xs font-thin px-2 py-1 md:font-semibold md:text-base md:px-3 md:py-2 text-black"
                >
                  Pet Details
                </p>
              </div>
            </div>
            {/* fields */}
            <div className="flex items-center rounded-md bg-background">
              {/* grid for fields */}
              <div
                className="w-full grid grid-flow-row gap-8 px-4 md:px-12 py-8 md:py-12"
              >
                {/* wrapper for pet name input label and input field */}
                <div className="w-full">
                  <label
                    htmlFor="PD_pet_name"
                    className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Pet Name:</label>
                  <input
                    id="PD_pet_name"
                    type="text"
                    className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                    required
                  />
                </div>

                {/* wrapper for checkbox group input label and checkbox buttons */}
                <div className="w-full">
                  {/* wrapper label for checkbox button group*/}
                  <div>
                    <label
                      htmlFor="PD_characteristics_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Characteristics:</label>
                  </div>
                  {/* grid for checkbox buttons*/}
                  <div
                    id="PD_characteristics_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Friendly choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_friendly"
                        className="form-checkbox h-3 w-3"
                        name="PD_characteristics_choices"
                        value="friendly"
                        required
                      />
                      <label
                        htmlFor="PD_friendly"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Friendly</label>
                    </div>
                    {/* wrapper for Adventurous choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_adventurous"
                        className="form-checkbox h-3 w-3"
                        name="PD_characteristics_choices"
                        value="adventurous"
                        required
                      />
                      <label
                        htmlFor="PD_adventurous"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Adventurous</label>
                    </div>
                    {/* wrapper for Extroverted choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_extroverted"
                        className="form-checkbox h-3 w-3"
                        name="PD_characteristics_choices"
                        value="extroverted"
                        required
                      />
                      <label
                        htmlFor="PD_extroverted"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Extroverted</label>
                    </div>
                    {/* wrapper for Introverted choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_introverted"
                        className="form-checkbox h-3 w-3"
                        name="PD_characteristics_choices"
                        value="introverted"
                        required
                      />
                      <label
                        htmlFor="PD_introverted"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Introverted</label>
                    </div>
                    {/* wrapper for Energetic choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_energetic"
                        className="form-checkbox h-3 w-3"
                        name="PD_characteristics_choices"
                        value="energetic"
                        required
                      />
                      <label
                        htmlFor="PD_energetic"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Energetic</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for checkbox group input label and checkbox buttons */}
                <div className="w-full">
                  {/* wrapper label for checkbox button group*/}
                  <div>
                    <label
                      htmlFor="PD_health_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Health:</label>
                  </div>
                  {/* grid for checkbox buttons*/}
                  <div
                    id="PD_health_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Spayed/Neutered choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_spayed"
                        className="form-checkbox h-3 w-3"
                        name="PD_health_choices"
                        value="spayed/neutered"
                        required
                      />
                      <label
                        htmlFor="PD_spayed"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Spayed/Neutered</label>
                      >
                    </div>
                    {/* wrapper for Vaccinated choice checkbox button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        id="PD_vaccinated"
                        className="form-checkbox h-3 w-3"
                        name="PD_health_choices"
                        value="vaccinated"
                        required
                      />
                      <label
                        htmlFor="PD_vaccinated"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Vaccinated</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for <> input label and input field */}
                <div className="w-full">
                  <label
                    htmlFor="PD_weight"
                    className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Weight:</label>
                  <input
                    id="PD_weight"
                    type="text"
                    className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                    required
                  />
                </div>

                {/* wrapper for radio group input label and radio buttons */}
                <div className="w-full">
                  {/* wrapper label for radio button group*/}
                  <div>
                    <label
                      htmlFor="PD_breed_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Breed:</label>
                  </div>
                  {/* grid for radio buttons*/}
                  <div
                    id="PD_breed_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Shiba Inu choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_shiba_inu"
                        className="form-radio h-3 w-3"
                        name="PD_breed_choices"
                        value="Shiba Inu"
                        required
                      />
                      <label
                        htmlFor="PD_shiba_inu"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Shiba Inu</label>
                    </div>
                    {/* wrapper for Pug choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_pug"
                        className="form-radio h-3 w-3"
                        name="PD_breed_choices"
                        value="pug"
                        required
                      />
                      <label
                        htmlFor="PD_pug"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Pug</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for radio group input label and radio buttons */}
                <div className="w-full">
                  {/* wrapper label for radio button group*/}
                  <div>
                    <label
                      htmlFor="PD_age_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Age:</label>
                  </div>
                  {/* grid for radio buttons*/}
                  <div
                    id="PD_age_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Puppy choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_puppy"
                        className="form-radio h-3 w-3"
                        name="PD_age_choices"
                        value="Puppy"
                        required
                      />
                      <label
                        htmlFor="PD_puppy"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Puppy</label>
                    </div>
                    {/* wrapper for Adult choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_adult"
                        className="form-radio h-3 w-3"
                        name="PD_age_choices"
                        value="Adult"
                        required
                      />
                      <label
                        htmlFor="PD_adult"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Adult</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for radio group input label and radio buttons */}
                <div className="w-full">
                  {/* wrapper label for radio button group*/}
                  <div>
                    <label
                      htmlFor="PD_gender_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Gender:</label>
                  </div>
                  {/* grid for radio buttons*/}
                  <div
                    id="PD_gender_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Male choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_male"
                        className="form-radio h-3 w-3"
                        name="PD_gender_choices"
                        value="Male"
                        required
                      />
                      <label
                        htmlFor="PD_male"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Male</label>
                    </div>
                    {/* wrapper for Female choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_female"
                        className="form-radio h-3 w-3"
                        name="PD_gender_choices"
                        value="Female"
                        required
                      />
                      <label
                        htmlFor="PD_female"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Female</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for radio group input label and radio buttons */}
                <div className="w-full">
                  {/* wrapper label for radio button group*/}
                  <div>
                    <label
                      htmlFor="PD_size_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Size:</label>
                  </div>
                  {/* grid for radio buttons*/}
                  <div
                    id="PD_size_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Small choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_small"
                        className="form-radio h-3 w-3"
                        name="PD_size_choice"
                        value="Small"
                        required
                      />
                      <label
                        htmlFor="PD_small"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Small</label>
                    </div>
                    {/* wrapper for Large choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_large"
                        className="form-radio h-3 w-3"
                        name="PD_size_choice"
                        value="Large"
                        required
                      />
                      <label
                        htmlFor="PD_large"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Large</label>
                    </div>
                    {/* wrapper for Extra Large choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_extra_large"
                        className="form-radio h-3 w-3"
                        name="PD_size_choice"
                        value="Extra Large"
                        required
                      />
                      <label
                        htmlFor="PD_extra_large"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Extra Large</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for radio group input label and radio buttons */}
                <div className="w-full">
                  {/* wrapper label for radio button group*/}
                  <div>
                    <label
                      htmlFor="PD_colors_grid"
                      className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Colors</label>
                  </div>
                  {/* grid for radio buttons*/}
                  <div
                    id="PD_colors_grid"
                    type="text"
                    className="grid grid-flow-row grid-cols-1 gap-1"
                  >
                    {/* wrapper for Black choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_black"
                        className="form-radio h-3 w-3"
                        name="PD_colors_choices"
                        value="Black"
                        required
                      />
                      <label
                        htmlFor="PD_black"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Black</label>
                    </div>
                    {/* wrapper for White choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_white"
                        className="form-radio h-3 w-3"
                        name="PD_colors_choices"
                        value="White"
                        required
                      />
                      <label
                        htmlFor="PD_white"
                        className="text-center text-xs sm:text-sm pl-2"
                        >White</label>
                    </div>
                    {/* wrapper for Golden choice radio button and label */}
                    <div
                      className="flex flex-row justify-start px-5 w-full items-center"
                    >
                      <input
                        type="radio"
                        id="PD_golden"
                        className="form-radio h-3 w-3"
                        name="PD_colors_choices"
                        value="Golden"
                        required
                      />
                      <label
                        htmlFor="PD_golden"
                        className="text-center text-xs sm:text-sm pl-2"
                        >Golden</label>
                    </div>
                  </div>
                </div>

                {/* wrapper for introduction input label and input field */}
                <div className="w-full">
                  <div>
                    <label
                      htmlFor="PD_introduction"
                      className="pb-0 text-thin text-xs sm:text-sm md:text-base text-black"
                      >Introduction/Description</label>
                  </div>
                  <textarea
                    id="PD_introduction"
                    className="rounded-md text-start align-top resize-none w-full text-sm px-3 py-2 h-40 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                    required
                  ></textarea>
                </div>

                {/* wrapper for special needs input label and input field */}
                <div className="w-full">
                  <label
                    htmlFor="PD_special_needs"
                    className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Special Needs:</label>
                  <input
                    id="PD_special_needs"
                    type="text"
                    className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                    required
                  />
                </div>

                {/* wrapper for label and file inputs */}
                <div className="w-full">
                  {/* label */}
                  <label
                    htmlFor="PD_label"
                    className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Choose 3 Photos:</label>
                  >
                  {/* wrapper for three file input sections */}
                  <div className="w-full">
                    {/* wrapper for file input */}
                    <div className="w-full py-2">
                      <input
                        type="file"
                        id="PD_file_1"
                        className="w-full rounded-md text-sm px-1 py:1 md:px-3 md:py-2 custom-choose-file-background file:text-xs border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs md:file:mr-4 md:file:py-2 md:file:px-4 md:file:rounded-full file:border-0 md:file:text-sm file:bg-transparent file:text-black"
                        required
                      />
                    </div>
                    {/* wrapper for file input */}
                    <div className="w-full py-2">
                      <input
                        type="file"
                        id="PD_file_2"
                        className="w-full rounded-md text-sm px-1 py:1 md:px-3 md:py-2 custom-choose-file-background file:text-xs border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs md:file:mr-4 md:file:py-2 md:file:px-4 md:file:rounded-full file:border-0 md:file:text-sm file:bg-transparent file:text-black"
                        required
                      />
                    </div>
                    {/* wrapper for file input */}
                    <div className="w-full py-2">
                      <input
                        type="file"
                        id="PD_file_3"
                        className="w-full rounded-md text-sm px-1 py:1 md:px-3 md:py-2 custom-choose-file-background file:text-xs border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs md:file:mr-4 md:file:py-2 md:file:px-4 md:file:rounded-full file:border-0 md:file:text-sm file:bg-transparent file:text-black"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* wrapper for delete listing and confirm changes buttons */}
        <div
          className="w-full flex flex-col gap-5 sm:gap-10 sm:flex-row justify-center items-center"
        >
          <div className="flex">
            <a
              href="../petListings/petListing.html"
              className="rounded-xl bg-red-400 px-2 sm:px-12 py-2 sm:py-3 text-white text-xs sm:text-base font-semibold text-center hover:scale-105 duration-200"
              >Delete Listing</a>
          </div>
          <div className="flex">
            <a
              href="../petListings/petListing.html"
              className="rounded-xl bg-accent-100 px-2 sm:px-12 py-2 sm:py-3 text-white text-xs sm:text-base font-semibold text-center hover:scale-105 duration-200"
              >Confirm Changes</a>
          </div>
        </div>
      </form>
    </main>
        </>
    )
}

export default Index