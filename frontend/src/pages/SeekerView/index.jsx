import React, { useState, useEffect } from "react";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate, useParams } from "react-router-dom";

const Index = () => {
  const { seekerID } = useParams();
  const [formData, setFormData] = useState({
    account: {
      avatar: "",
      email: "",
      name: "",
    },
    province: "",
    city: "",
    phone_number: "",
    animal_preference: "",
    age_preference: "",
    sex_preference: "",
    size_preference: "",
    open_to_special_needs_animals: "",
    breed_preference: "",
  });
  const [animal, setAnimal] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [spn, setSPN] = useState("");

  const handleInformation = () => {
    if (formData.animal_preference === "dog") {
      setAnimal("Dog");
    }
    if (formData.animal_preference === "cat") {
      setAnimal("Cat");
    }
    if (formData.animal_preference === "other") {
      setAnimal("Other");
    }
    if (formData.age_preference === 1) {
      setAge("Infant");
    }
    if (formData.age_preference === 2) {
      setAge("Young");
    }
    if (formData.age_preference === 3) {
      setAge("Adult");
    }
    if (formData.age_preference === 4) {
      setAge("Senior");
    }
    if (formData.size_preference === 1) {
      setSize("Small")
    }
    if (formData.size_preference === 2) {
      setSize("Medium")
    }
    if (formData.size_preference === 3) {
      setSize("Large")
    }
    if (formData.sex_preference === "male") {
      setGender("Male");
    }
    if (formData.sex_preference === "female") {
      setGender("Female");
    }
    if (formData.open_to_special_needs_animals) {
      setSPN("Yes");
    }
    if (!formData.open_to_special_needs_animals) {
      setSPN("No");
    }
  }

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const rest = await ajax_or_login(
        `/accounts/seeker/${seekerID}/`,
        { method: "GET" },
        navigate
      );
      if (rest.ok) {
        const data = await rest.json();

        setFormData({
          account: {
            avatar: data.account.avatar || null,
            email: data.account.email || "",
            name: data.account.name || "",
          },
          province: data.province || "",
          city: data.city || "",
          phone_number: data.phone_number || "",
          animal_preference: data.animal_preference || "",
          age_preference: data.age_preference || "",
          sex_preference: data.sex_preference || "",
          size_preference: data.size_preference || "",
          open_to_special_needs_animals:
            data.open_to_special_needs_animals || "",
          breed_preference: data.breed_preference || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    handleInformation();
  }, []);

  return (
    <main>
      <div>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex flex-col gap-6 justify-center items-center drop-shadow-xl">
          <div className="rounded-full w-1/2 flex justify-center self-center aspect-square md:hidden">
            <img
              src={localStorage.getItem("avatar")}
              className="w-full rounded-full border border-primary"
            />
          </div>
          <div className="w-full drop-shadow-xl">
            <div className="bg-primary flex justify-center items-center h-28 rounded-t-3xl max-md:justify-evenly">
              <div className="flex justify-center items-center px-8">
                <div className="font-bold w-full text-5xl text-white text text-center max-sm:text-3xl bg-transparent">
                  {formData.account.name}
                </div>
              </div>
            </div>
            <div className="bg-white flex justify-center items-center rounded-b-3xl flex-row gap-20 max-2xl:gap-16 max-lg:gap-10 p-10 w-full">
              <div className="basis-2/3 w-full">
                <h1 className="font-medium text-3xl max-sm:text-2xl text-primary mb-2">
                  Your Location
                </h1>
                <div className="flex flex-row gap-6 mb-10 max-lg:flex-col w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="City" className="text-base text-text">
                      City:
                    </label>
                    <input
                      id="City"
                      name="city"
                      value={formData.city}
                      disabled
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5 max-sm:text-xs"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="Province" className="text-base text-text">
                      Province:
                    </label>
                    <input
                      value={formData.province}
                      name="province"
                      id="Province"
                      type="text"
                      disabled
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5 max-sm:text-xs"
                    />
                  </div>
                </div>
                <h1 className="font-medium text-3xl max-sm:text-2xl text-primary mb-2">
                  Contact Information
                </h1>
                <div className="flex flex-row gap-6 mb-8 max-lg:flex-col">
                  <div className="flex flex-col w-full">
                    <label htmlFor="Email" className="text-base text-text ">
                      Email Address:
                    </label>
                    <input
                      name="account.email"
                      value={formData.account.email}
                      type="text"
                      disabled
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5 max-sm:text-xs"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="phone_number"
                      className="text-base text-text"
                    >
                      Phone Number:
                    </label>
                    <input
                      name="phone_number"
                      value={formData.phone_number}
                      type="text"
                      disabled
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5 max-sm:text-xs"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-full min-h-[200px] aspect-square   max-md:hidden basis-1/3">
                <img
                  src={localStorage.getItem("avatar")}
                  className="w-full  rounded-full border border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl flex-col rounded-3xl p-8">
          <h1 className="font-medium text-3xl text-white pb-2 mb-3">
            Preferences
          </h1>
          <div className="flex flex-col mb-2 w-full">
            <div className="border-primary rounded-md h-11 border border-opacity-50 bg-white flex items-center px-4">
              Animal: {animal}
            </div>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <div className="border-primary rounded-md h-11 border border-opacity-50 bg-white flex items-center px-4">
              Age: {age}
            </div>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <div className="border-primary rounded-md h-11 border border-opacity-50 bg-white flex items-center px-4">
              Gender: {gender}
            </div>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <div className="border-primary rounded-md h-11 border border-opacity-50 bg-white flex items-center px-4">
              Size: {size}
            </div>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <div className="border-primary rounded-md h-11 border border-opacity-50 bg-white flex items-center px-4">
              SPN: {spn}
            </div>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <label htmlFor="Breed" className="text-white">
              Breed:
            </label>
            <div className="border-primary rounded-md h-11 border border-opacity-50 bg-white px-5 flex items-center">
              {formData.breed_preference}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
