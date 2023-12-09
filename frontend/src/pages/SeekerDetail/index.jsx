import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <main>
      <form>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl">
          <div className="w-[1179px] max-2xl:w-[900px] drop-shadow-xl">
            <div className="bg-primary flex justify-center items-center h-28 rounded-t-3xl max-md:justify-evenly">
              <div className="flex justify-center items-center">
                <h1 className="font-bold text-5xl text-white text text-center max-sm:text-3xl">
                  Mishu
                </h1>
                <Link to="userAccountUpdateName.html">
                  <button className="hover:scale-125 duration-200 ease-linear">
                    <i className="uil uil-edit text-2xl text-white ml-3"></i>
                  </button>
                </Link>
              </div>
              <div className="rounded-full w-20 aspect-square bg-black group relative cursor-pointer md:hidden">
                <img
                  src={localStorage.getItem("avatar")}
                  className="w-full group-hover:opacity-50 rounded-full border border-primary"
                />
                <i className="uil uil-edit-alt absolute left-[35%] top-[30%] hidden group-hover:block text-white text-2xl"></i>
              </div>
            </div>
            <div className="bg-white flex justify-center items-center rounded-b-3xl flex-row h-80 max-md:h-96 gap-20 max-2xl:gap-16 max-lg:gap-10">
              <div>
                <h1 className="font-medium text-3xl max-sm:text-2xl text-primary pb-2">
                  Your Location
                </h1>
                <hr className="text-[#D7D7D7] w-[580px] max-2xl:w-96 mb-6 max-md:w-72 max-sm:w-52" />
                <div className="flex flex-col gap-2 md:hidden visible">
                  <div className="flex flex-col">
                    <label for="Country" className="text-base text-text">
                      Country:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label for="Province" className="text-base text-text">
                      Province:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label for="City" className="text-base text-text">
                      City:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label for="Postal Code" className="text-base text-text">
                      Postal Code:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-6 mb-2 max-md:hidden">
                  <div className="flex flex-col">
                    <label for="Country" className="text-base text-text">
                      Country:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 max-2xl:w-52 max-lg:w-40 border border-opacity-50 bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label for="Province" className="text-base text-text">
                      Province:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 max-2xl:w-52 max-lg:w-40 border border-opacity-50 bg-white"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-6 max-md:hidden">
                  <div className="flex flex-col">
                    <label for="City" className="text-base text-text">
                      City:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72  max-2xl:w-52 max-lg:w-40 border border-opacity-50 bg-white"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label for="Postal Code" className="text-base text-text">
                      Postal Code:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72  max-2xl:w-52 max-lg:w-40 border border-opacity-50 bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-full w-[270px] max-2xl:w-[200px] max-md:w-[100px] aspect-square bg-black group relative cursor-pointer max-md:hidden">
                <img
                  src={localStorage.getItem("avatar")}
                  className="w-full group-hover:opacity-50 rounded-full border border-primary"
                />
                <i className="uil uil-edit-alt absolute left-[46%] top-[46%] hidden group-hover:block text-white text-4xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl max-md:hidden">
          <div className="w-[1179px] max-2xl:w-[900px] drop-shadow-xl">
            <div className="flex flex-col">
              <div className="flex md:flex-row justify-between items-start flex-col max-md:gap-5">
                <div className="flex flex-col gap-5">
                  <div className="bg-white flex justify-center items-center w-[520px] flex-col rounded-3xl h-[280px] max-2xl:w-[380px] drop-shadow-xl">
                    <h1 className="font-medium text-3xl max-sm:text-2xl text-primary pb-2 mt-8 mb-5">
                      Contact Information
                    </h1>
                    <div className="flex flex-col gap-2 mb-8">
                      <div className="flex flex-col">
                        <label for="Email" className="text-base text-text">
                          Email Address:
                        </label>
                        <input
                          type="text"
                          className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label for="Phone" className="text-base text-text">
                          Phone Number:
                        </label>
                        <input
                          type="text"
                          className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-col bg-secondary w-[520px] h-[280px] max-2xl:w-[380px] drop-shadow-xl rounded-3xl">
                    <h1 className="font-medium text-3xl max-sm:text-2xl text-text pb-2 mt-8 mb-5">
                      Receive Alerts
                    </h1>
                    <div className="flex flex-row gap-3 mb-8">
                      <div className="flex flex-col">
                        <input type="checkbox" className="mt-1 mb-3" />
                        <input type="checkbox" className="mb-3" />
                        <input type="checkbox" />
                      </div>
                      <div className="flex flex-col">
                        <label for="messages">Messages</label>
                        <label for="status updates">Status Updates</label>
                        <label for="pet listings">New Pet Listings</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary flex justify-center items-center flex-col h-[580px] w-[500px] max-2xl:w-[380px] max-xl:w-[480px] max-lg:w-[280px] max-md:w-[280px] rounded-3xl drop-shadow-xl">
                  <h1 className="font-medium text-3xl text-white pb-2 mb-3">
                    Preferences
                  </h1>
                  <div className="flex flex-col mb-2">
                    <label for="Pet" className="text-white">
                      Pet:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label for="Age" className="text-white">
                      Age:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label for="Gender" className="text-white">
                      Gender:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label for="Size" className="text-white">
                      Size:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label for="specialneeds" className="text-white">
                      Open to Special Needs:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
                    />
                  </div>
                  <div className="flex flex-col mb-2">
                    <label for="Breed" className="text-white">
                      Breed:
                    </label>
                    <input
                      type="text"
                      className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-16">
                {" "}
                <button className="bg-accent-100 font-bold text-white w-64 h-20 justify-center items-center text-2xl rounded-3xl">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl md:hidden">
          <div className="w-[1179px] max-2xl:w-[900px] bg-white flex justify-center items-center flex-col rounded-3xl">
            <h1 className="font-medium text-3xl max-sm:text-2xl text-primary pb-2 mt-8 mb-5 text-center">
              Contact Information
            </h1>
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex flex-col">
                <label for="Email" className="text-base text-text">
                  Email Address:
                </label>
                <input
                  type="text"
                  className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                />
              </div>
              <div className="flex flex-col">
                <label for="Phone" className="text-base text-text">
                  Phone Number:
                </label>
                <input
                  type="text"
                  className="border-primary rounded-md h-11 w-72 border border-opacity-50 bg-white max-sm:w-52"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl md:hidden">
          <div className="w-[1179px] max-2xl:w-[900px] bg-secondary flex justify-center items-center flex-col rounded-3xl">
            <h1 className="font-medium text-3xl max-sm:text-2xl text-text pb-2 mt-8 mb-5 text-center">
              Receive Alerts
            </h1>
            <div className="flex flex-row gap-3 mb-8">
              <div className="flex flex-col">
                <input type="checkbox" className="mt-1 mb-3" />
                <input type="checkbox" className="mb-3" />
                <input type="checkbox" />
              </div>
              <div className="flex flex-col">
                <label for="messages">Messages</label>
                <label for="status updates">Status Updates</label>
                <label for="pet listings">New Pet Listings</label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-9 mx-mobile md:mx-tablet xl:mx-desktop flex justify-center items-center drop-shadow-xl md:hidden">
          <div className="w-[1179px] max-2xl:w-[900px] bg-primary flex justify-center items-center flex-col rounded-3xl">
            <h1 className="font-medium text-3xl text-white pb-2 mb-3 mt-5 text-center">
              Preferences
            </h1>
            <div className="flex flex-col mb-2">
              <label for="Pet" className="text-white">
                Pet:
              </label>
              <input
                type="text"
                className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label for="Age" className="text-white">
                Age:
              </label>
              <input
                type="text"
                className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label for="Gender" className="text-white">
                Gender:
              </label>
              <input
                type="text"
                className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label for="Size" className="text-white">
                Size:
              </label>
              <input
                type="text"
                className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label for="specialneeds" className="text-white">
                Open to Special Needs:
              </label>
              <input
                type="text"
                className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label for="Breed" className="text-white">
                Breed:
              </label>
              <input
                type="text"
                className="border-primary rounded-md h-11 w-72 border border-opacity-50 max-lg:w-52 bg-white"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-16 md:hidden">
          {" "}
          <button className="bg-accent-100 font-bold text-white w-64 h-20 justify-center items-center text-2xl rounded-3xl">
            Update Profile
          </button>
        </div>
      </form>
    </main>
  );
};

export default index;
