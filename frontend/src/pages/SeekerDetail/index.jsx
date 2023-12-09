import React, { useState, useEffect } from "react";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate } from "react-router-dom";

const Index = () => {
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
  const [toDelete, setDelete] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("account.")) {
      setFormData((prevData) => ({
        ...prevData,
        account: {
          ...prevData.account,
          [name.split("account.")[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!toDelete) {
      try {
        const rest = await ajax_or_login(
          `/accounts/seeker/${parseInt(localStorage.getItem("userID"), 10) || ""
          }/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
          navigate
        );
        if (!rest.ok) {
          const json = await rest.json();
          console.log(json);
        }
        if (rest.ok) {
          const data = await rest.json();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await ajax_or_login(`/accounts/seeker/${parseInt(localStorage.getItem("userID"), 10) || ""
          }/`,
          {
            method: "DELETE"
          }, navigate)

          if (res.ok) {
            navigate("/login/")
          }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const rest = await ajax_or_login(
        `/accounts/seeker/${parseInt(localStorage.getItem("userID"), 10) || ""
        }/`,
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
  }, []);

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex flex-col gap-6 justify-center items-center drop-shadow-xl">
          <div className="rounded-full w-1/2 flex justify-center self-center aspect-square bg-black group relative cursor-pointer md:hidden">
            <img
              src={localStorage.getItem("avatar")}
              className="w-full group-hover:opacity-50 rounded-full border border-primary"
            />
            <i className="uil uil-edit-alt absolute left-[35%] top-[30%] hidden group-hover:block text-white text-2xl"></i>
          </div>
          <div className="w-full drop-shadow-xl">
            <div className="bg-primary flex justify-center items-center h-28 rounded-t-3xl max-md:justify-evenly">
              <div className="flex justify-center items-center px-8">
                <input
                  name="account.name"
                  className="font-bold w-full text-5xl text-white text text-center max-sm:text-3xl bg-transparent"
                  value={formData.account.name}
                  onChange={handleInputChange}
                />
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
                      onChange={handleInputChange}
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
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
                      onChange={handleInputChange}
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
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
                      onChange={handleInputChange}
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
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
                      onChange={handleInputChange}
                      className="border-primary rounded-md h-11 w-full border border-opacity-50 bg-white px-5"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-full min-h-[200px] aspect-square bg-black group relative cursor-pointer max-md:hidden basis-1/3">
                <img
                  src={localStorage.getItem("avatar")}
                  className="w-full group-hover:opacity-50 rounded-full border border-primary"
                />
                <i className="uil uil-edit-alt absolute left-[46%] top-[46%] hidden group-hover:block text-white text-4xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl flex-col rounded-3xl p-8">
          <h1 className="font-medium text-3xl text-white pb-2 mb-3">
            Preferences
          </h1>
          <div className="flex flex-col mb-2 w-full">
            <select
              name="animal_preference"
              value={formData.animal_preference}
              onChange={handleInputChange}
              className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
            >
              <option value="">Select a pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <select
              name="age_preference"
              value={formData.age_preference}
              onChange={handleInputChange}
              className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
            >
              <option value="">Select an age</option>
              <option value={1}>Infant</option>
              <option value={2}>Young</option>
              <option value={3}>Adult</option>
              <option value={4}>Senior</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <select
              name="sex_preference"
              value={formData.sex_preference}
              onChange={handleInputChange}
              className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
            >
              <option value="">Select a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <select
              name="size_preference"
              value={formData.size_preference}
              onChange={handleInputChange}
              className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
            >
              <option value="">Select a size</option>
              <option value={1}>Small</option>
              <option value={2}>Medium</option>
              <option value={3}>Large</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <select
              name="open_to_special_needs_animals"
              value={formData.open_to_special_needs_animals}
              onChange={handleInputChange}
              className="border-primary rounded-md h-11 border border-opacity-50 bg-white"
            >
              <option value="">Open to special needs?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 w-full">
            <label htmlFor="Breed" className="text-white">
              Breed:
            </label>
            <input
              name="breed_preference"
              type="text"
              className="border-primary rounded-md h-11 border border-opacity-50 bg-white px-5"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-16 gap-16 max-md:flex-col max-md:gap-3">
          <button
            className="bg-accent-100 font-bold text-white w-64 h-20 justify-center items-center text-2xl rounded-3xl"
            onClick={() => setDelete(false)}
          >
            Update Profile
          </button>
          <button
            className="bg-accent-100 font-bold text-white w-64 h-20 justify-center items-center text-2xl rounded-3xl"
            onClick={() => setDelete(true)}
          >
            Delete Profile
          </button>
        </div>
      </form>
    </main>
  );
};

export default Index;
