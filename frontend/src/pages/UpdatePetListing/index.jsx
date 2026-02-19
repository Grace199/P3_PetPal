import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { ajax_or_login } from '../../util/ajax'
import FieldError from "../../components/FieldError";

const Index = () => {
  const navigate = useNavigate();
  const { petlistingID } = useParams();

  const [errors, setErrors] = useState({
    pet: {
      is_friendly: null,
      is_adventurous: null,
      is_extroverted: null,
      is_introverted: null,
      is_energetic: null,
      is_spn: null,
      is_vaccinated: null,
      animal_type: null,
      name: null,
      age: null,
      sex: null,
      size: null,
      colour: null,
      breed: null,
      description: null,
      special_needs: null, // not required
      weight: null,

      image1: null, // not required
      image2: null, // not required
      image3: null, // not required
    },

    status: null,
    adoption_fee: null
  });

  useEffect(() => {
    setErrors({});
  }, [navigate, petlistingID]);

  const [formData, setFormData] = useState({
    pet: {
      is_friendly: false,
      is_adventurous: false,
      is_extroverted: false,
      is_introverted: false,
      is_energetic: false,
      is_spn: false,
      is_vaccinated: false,
      animal_type: "",
      name: "",
      age: "",
      sex: "",
      size: "",
      colour: "",
      breed: "",
      description: "",
      special_needs: "", // not required
      weight: "",
      image1: null, // not required
      image2: null, // not required
      image3: null, // not required
    },

    status: "",
    adoption_fee: ""

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ajax_or_login(`/petlisting/${petlistingID}`, { method: "GET" }, navigate);
        if (res.ok) {
          const data = await res.json();
          const { pet: { image1, image2, image3, ...restOfPet }, ...restOfData } = data;

          setFormData({
            pet: restOfPet,
            ...restOfData,
          });

        } else {
          console.error("Error during fetch: ", res);
        }
      } catch (error) {
        console.error("Error during fetch: ", error);
      }
    };
    fetchData();
  }, [navigate, petlistingID]);

  async function handle_submit(event) {
    event.preventDefault();
    let filteredFormData = new FormData();
    filteredFormData.append("pet.is_friendly", formData.pet.is_friendly);
    filteredFormData.append("pet.is_adventurous", formData.pet.is_adventurous);
    filteredFormData.append("pet.is_extroverted", formData.pet.is_extroverted);
    filteredFormData.append("pet.is_introverted", formData.pet.is_introverted);
    filteredFormData.append("pet.is_energetic", formData.pet.is_energetic);
    filteredFormData.append("pet.is_spn", formData.pet.is_spn);
    filteredFormData.append("pet.is_vaccinated", formData.pet.is_vaccinated);
    filteredFormData.append("pet.animal_type", formData.pet.animal_type);
    filteredFormData.append("pet.name", formData.pet.name);
    filteredFormData.append("pet.age", formData.pet.age);
    filteredFormData.append("pet.sex", formData.pet.sex);
    filteredFormData.append("pet.size", formData.pet.size);
    filteredFormData.append("pet.colour", formData.pet.colour);
    filteredFormData.append("pet.breed", formData.pet.breed);
    filteredFormData.append("pet.description", formData.pet.description);
    filteredFormData.append("pet.special_needs", formData.pet.special_needs);
    filteredFormData.append("pet.weight", formData.pet.weight);
    if (formData.pet.image1) {
      filteredFormData.append("pet.image1", formData.pet.image1);
    }
    if (formData.pet.image2) {
      filteredFormData.append("pet.image2", formData.pet.image2);
    }
    if (formData.pet.image3) {
      filteredFormData.append("pet.image3", formData.pet.image3);
    }
    filteredFormData.append("status", formData.status);
    filteredFormData.append("adoption_fee", formData.adoption_fee);
    const requestOptions = {
      method: 'PATCH',
      body: filteredFormData
    };

    try {
      console.log(JSON.stringify(formData));
      const res = await ajax_or_login(`/petlisting/${petlistingID}/`, requestOptions, navigate);

      if (!res.ok) {
        const json = await res.json();
        setErrors(json);
      }
      else {
        navigate("/mylistings/");
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
    }
  };

  async function handle_delete(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    };

    try {
      const res = await ajax_or_login(`/petlisting/${petlistingID}`, requestOptions, navigate);

      if (!res.ok) {
        const json = await res.json();
        setErrors(json);
      }
      else {
        navigate("/petlistings/");
      }
    } catch (error) {
      console.error("Error during fetch: ", error);
    }
  };

  const handleInputChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangeFormPet = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, pet: {
        ...formData.pet, [name]: value
      }
    });
  }

  const handleInputChangeFormPetBool = (e) => {
    const { name, checked } = e.target;
    const value = checked ? true : false;
    setFormData({
      ...formData, pet: {
        ...formData.pet, [name]: value
      }
    });
  }

  const handleImageChange = (e) => {
    const { name } = e.target;
    const newFile = e.target.files[0];
    setFormData({
      ...formData, pet: {
        ...formData.pet, [name]: newFile
      }
    });
    console.log(formData);
  }


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
                    <input onChange={handleInputChangeFormPet}
                      name="name"
                      value={formData?.pet?.name ?? ''}
                      id="PD_pet_name"
                      type="text"
                      className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                      required
                    />
                  </div>
                  <FieldError fielderror={errors?.pet?.name} />

                  {/* wrapper for radio group input label and radio buttons */}
                  <div className="w-full">
                    {/* wrapper label for radio button group*/}
                    <div>
                      <label
                        htmlFor="PD_animal_type_grid"
                        className="text-thin text-xs sm:text-sm md:text-base text-black"
                      >Animal Type:</label>
                    </div>
                    {/* grid for radio buttons*/}
                    <div
                      id="PD_animal_type_grid"
                      type="text"
                      className="grid grid-flow-row grid-cols-1 gap-1"
                    >
                      {/* wrapper for Dog choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="animal_type_dog"
                          className="form-radio h-3 w-3"
                          name="animal_type"
                          checked={formData?.pet?.animal_type === "dog"}
                          value="dog"
                          required
                        />
                        <label
                          htmlFor="PD_male"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Dog</label>
                      </div>
                      {/* wrapper for Cat choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="animal_type_cat"
                          className="form-radio h-3 w-3"
                          name="animal_type"
                          checked={formData?.pet?.animal_type === "cat"}
                          value="cat"
                          required
                        />
                        <label
                          htmlFor="animal_type_cat"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Cat</label>
                      </div>

                      {/* wrapper for Other choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="animal_type_other"
                          className="form-radio h-3 w-3"
                          name="animal_type"
                          checked={formData?.pet?.animal_type === "other"}
                          value="other"
                          required
                        />
                        <label
                          htmlFor="animal_type_other"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Other</label>
                      </div>
                    </div>
                  </div>
                  <FieldError fielderror={errors?.pet?.animal_type} />

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
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_friendly"
                          className="form-checkbox h-3 w-3"
                          name="is_friendly"
                          value="True"
                          checked={formData?.pet?.is_friendly === true ?? false}
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
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_adventurous"
                          className="form-checkbox h-3 w-3"
                          name="is_adventurous"
                          value="True"
                          checked={formData?.pet?.is_adventurous === true ?? false}
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
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_extroverted"
                          className="form-checkbox h-3 w-3"
                          name="is_extroverted"
                          value="True"
                          checked={formData?.pet?.is_extroverted === true ?? false}
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
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_introverted"
                          className="form-checkbox h-3 w-3"
                          name="is_introverted"
                          value="True"
                          checked={formData?.pet?.is_introverted === true ?? false}

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
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_energetic"
                          className="form-checkbox h-3 w-3"
                          name="is_energetic"
                          value="True"
                          checked={formData?.pet?.is_energetic === true ?? false}
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
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_spayed"
                          className="form-checkbox h-3 w-3"
                          name="is_spn"
                          value="True"
                          checked={formData?.pet?.is_spn === true ?? false}
                        />
                        <label
                          htmlFor="PD_spayed"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Spayed/Neutered</label>
                      </div>
                      {/* wrapper for Vaccinated choice checkbox button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPetBool}
                          type="checkbox"
                          id="PD_vaccinated"
                          className="form-checkbox h-3 w-3"
                          name="is_vaccinated"
                          value="True"
                          checked={formData?.pet?.is_vaccinated === true ?? false}
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
                    <input onChange={handleInputChangeFormPet}
                      id="PD_weight"
                      type="text"
                      name="weight"
                      value={formData?.pet?.weight ?? ''}
                      className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                      required
                    />
                  </div>
                  <FieldError fielderror={errors?.pet?.weight} />

                  {/* wrapper for radio group input label and radio buttons */}
                  <div className="w-full">
                    {/* wrapper label for radio button group*/}
                    <div>
                      <label
                        htmlFor="PD_breed"
                        className="pb-0 text-xs text-thin md:text-sm text-black"
                      >Breed:</label>
                      <input onChange={handleInputChangeFormPet}
                        id="PD_breed"
                        type="text"
                        name="breed"
                        value={formData?.pet?.breed ?? ''}
                        className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                        required
                      />
                    </div>
                  </div>
                  <FieldError fielderror={errors?.pet?.breed} />

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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_puppy"
                          className="form-radio h-3 w-3"
                          name="age"
                          value="1"
                          checked={formData?.pet?.age === "1" || formData?.pet?.age === 1}
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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_young"
                          className="form-radio h-3 w-3"
                          name="age"
                          value="2"
                          checked={formData?.pet?.age === "2" || formData?.pet?.age === 2}
                          required
                        />
                        <label
                          htmlFor="PD_young"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Young</label>
                      </div>
                      {/* wrapper for Adult choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_adult"
                          className="form-radio h-3 w-3"
                          name="age"
                          value="3"
                          checked={formData?.pet?.age === "3" || formData?.pet?.age === 3}
                          required
                        />
                        <label
                          htmlFor="PD_adult"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Adult</label>
                      </div>

                      {/* wrapper for Senior choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_senior"
                          className="form-radio h-3 w-3"
                          name="age"
                          value="4"
                          checked={formData?.pet?.age === "4" || formData?.pet?.age === 4}
                          required
                        />
                        <label
                          htmlFor="PD_senior"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Senior</label>
                      </div>
                    </div>
                  </div>
                  <FieldError fielderror={errors?.pet?.age} />

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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_male"
                          className="form-radio h-3 w-3"
                          name="sex"
                          value="male"
                          checked={formData?.pet?.sex === "male" ?? false}
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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_female"
                          className="form-radio h-3 w-3"
                          name="sex"
                          value="female"
                          checked={formData?.pet?.sex === "female" ?? false}
                          required
                        />
                        <label
                          htmlFor="PD_female"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Female</label>
                      </div>
                    </div>
                  </div>
                  <FieldError fielderror={errors?.pet?.sex} />

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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_small"
                          className="form-radio h-3 w-3"
                          name="size"
                          value="1"
                          checked={formData?.pet?.size === "1" || formData?.pet?.size === 1}
                          required
                        />
                        <label
                          htmlFor="PD_small"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Small</label>
                      </div>
                      {/* wrapper for Medium choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_medium"
                          className="form-radio h-3 w-3"
                          name="size"
                          value="2"
                          checked={formData?.pet?.size === "2" || formData?.pet?.size === 2}
                          required
                        />
                        <label
                          htmlFor="PD_medium"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Medium</label>
                      </div>
                      {/* wrapper for Large choice radio button and label */}
                      <div
                        className="flex flex-row justify-start px-5 w-full items-center"
                      >
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_large"
                          className="form-radio h-3 w-3"
                          name="size"
                          value="3"
                          checked={formData?.pet?.size === "3" || formData?.pet?.size === 3}
                          required
                        />
                        <label
                          htmlFor="PD_large"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Large</label>
                      </div>
                    </div>
                  </div>
                  <FieldError fielderror={errors?.pet?.size} />

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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_black"
                          className="form-radio h-3 w-3"
                          name="colour"
                          value="black"
                          checked={formData?.pet?.colour === "black" ?? false}
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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_white"
                          className="form-radio h-3 w-3"
                          name="colour"
                          value="white"
                          checked={formData?.pet?.colour === "white" ?? false}
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
                        <input onChange={handleInputChangeFormPet}
                          type="radio"
                          id="PD_golden"
                          className="form-radio h-3 w-3"
                          name="colour"
                          value="golden"
                          checked={formData?.pet?.colour === "golden" ?? false}
                          required
                        />
                        <label
                          htmlFor="PD_golden"
                          className="text-center text-xs sm:text-sm pl-2"
                        >Golden</label>
                      </div>
                    </div>
                  </div>
                  <FieldError fielderror={errors?.pet?.colour} />

                  {/* wrapper for introduction input label and input field */}
                  <div className="w-full">
                    <div>
                      <label
                        htmlFor="PD_introduction"
                        className="pb-0 text-thin text-xs sm:text-sm md:text-base text-black"
                      >Introduction/Description</label>
                    </div>
                    <textarea
                      onChange={handleInputChangeFormPet}
                      id="PD_introduction"
                      name="description"
                      value={formData?.pet?.description ?? ''}
                      className="rounded-md text-start align-top resize-none w-full text-sm px-3 py-2 h-40 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                      required
                    ></textarea>
                  </div>
                  <FieldError fielderror={errors?.pet?.description} />

                  {/* wrapper for special needs input label and input field */}
                  <div className="w-full">
                    <label
                      htmlFor="PD_special_needs"
                      className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Special Needs:</label>
                    <input onChange={handleInputChangeFormPet}
                      id="PD_special_needs"
                      type="text"
                      name="special_needs"
                      value={formData?.pet?.special_needs ?? ''}
                      className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                    />
                  </div>
                  <FieldError fielderror={errors?.pet?.description} />

                  {/* wrapper for label and file inputs */}
                  <div className="w-full">
                    {/* label */}
                    <label
                      htmlFor="PD_label"
                      className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Choose 3 Photos:</label>
                    {/* wrapper for three file input sections */}
                    <div className="w-full">
                      {/* wrapper for file input */}
                      <div className="w-full py-2">
                        <input onChange={handleImageChange}
                          name="image1"
                          type="file"
                          id="PD_file_1"
                          className="w-full rounded-md text-sm px-1 py:1 md:px-3 md:py-2 custom-choose-file-background file:text-xs border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs md:file:mr-4 md:file:py-2 md:file:px-4 md:file:rounded-full file:border-0 md:file:text-sm file:bg-transparent file:text-black"
                        />
                      </div>
                      <FieldError fielderror={errors?.pet?.image1} />
                      {/* wrapper for file input */}
                      <div className="w-full py-2">
                        <input onChange={handleImageChange}
                          name="image2"
                          type="file"
                          id="PD_file_2"
                          className="w-full rounded-md text-sm px-1 py:1 md:px-3 md:py-2 custom-choose-file-background file:text-xs border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs md:file:mr-4 md:file:py-2 md:file:px-4 md:file:rounded-full file:border-0 md:file:text-sm file:bg-transparent file:text-black"
                        />
                      </div>
                      <FieldError fielderror={errors?.pet?.image2} />
                      {/* wrapper for file input */}
                      <div className="w-full py-2">
                        <input onChange={handleImageChange}
                          name="image3"
                          type="file"
                          id="PD_file_3"
                          className="w-full rounded-md text-sm px-1 py:1 md:px-3 md:py-2 custom-choose-file-background file:text-xs border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100 placeholder:text-xs md:file:mr-4 md:file:py-2 md:file:px-4 md:file:rounded-full file:border-0 md:file:text-sm file:bg-transparent file:text-black"
                        />
                      </div>
                      <FieldError fielderror={errors?.pet?.image3} />
                    </div>
                  </div>
                  {/* wrapper for adoption fee and label */}
                  <div className="w-full">
                    <label
                      htmlFor="adoption_fee"
                      className="pb-0 text-xs text-thin md:text-sm text-black"
                    >Adoption Fee: </label>
                    <input onChange={handleInputChangeForm}
                      id="adoption_fee"
                      type="number"
                      name="adoption_fee"
                      value={formData?.adoption_fee ?? ''}
                      className="w-full rounded-md text-sm px-3 py-2 border-opacity-25 border-[1.5px] focus:border-primary border-primary text-accent-100"
                    />
                  </div>
                  <FieldError fielderror={errors?.adoption_fee} />

                  {/* wrapper for status and label */}
                  <div className="flex justify-left items-center gap-1 py-3 px-4 max-sm:px-2 md:px-8 rounded-full group">
                    <label
                      htmlFor="status"
                      className="text-xs font-thin sm:text-sm text-black mr-2"
                    >Status:
                    </label>
                    <div id="status">
                      <select name="status" value={formData?.status ?? ''} onChange={handleInputChangeForm} className='hover:cursor-pointer'>
                        <option value=""></option>
                        <option value="AVAILABLE">available</option>
                        <option value="WITHDRAWN">withdrawn</option>
                        <option value="ADOPTED">adopted</option>
                      </select>
                    </div>
                  </div>
                  <FieldError fielderror={errors?.status} />

                </div>


              </div>
            </div>
          </div>

          {/* wrapper for cancel and create buttons */}
          <div
            className="flex flex-col gap-5 sm:gap-10 sm:flex-row justify-center items-center"
          >
            <div className="flex">
              <button
                onClick={handle_delete}
                name="button_cancel"
                className="rounded-xl bg-red-400 px-2 sm:px-12 py-2 sm:py-3 text-white text-base font-semibold text-center hover:scale-105 duration-200"
              >Delete Listing</button>
            </div>
            <div className="flex">
              <button
                onClick={handle_submit}
                name="button_create"
                className="rounded-xl bg-accent-100 px-2 sm:px-12 py-2 sm:py-3 text-white text-base font-semibold text-center hover:scale-105 duration-200"
              >Confirm Changes</button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

export default Index