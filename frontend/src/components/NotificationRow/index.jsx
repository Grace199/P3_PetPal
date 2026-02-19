import React from "react";
import { ajax_or_login } from "../../util/ajax";
import { useNavigate } from "react-router-dom";

const Index = ({ msg, creation_date, is_read, url, ID, setDelete }) => {
  const navigate = useNavigate();

  const handleNotificationDelete = async (e) => {
    try {
      e.stopPropagation();
      await ajax_or_login(`/notification/${ID}`, {
        method: "DELETE",
      });
      setDelete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReading = async () => {
    try {
      await ajax_or_login(`/notification/${ID}`, {
        method: "GET",
      });
      navigate(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleReading}
      className={`${
        is_read ? "bg-[#E8E8E8]" : "bg-white"
      } h-20 flex justify-around items-center xl:mx-desktop md:mx-tablet mx-mobile p-3 max-md:p-1 border-b border-light-gray hover:bg-light-gray hover:cursor-pointer`}
    >
      <div className="basis-1/2 flex justify-center items-center text-center">
        <p className="text-text text-base font-light max-md:text-xs">{msg}</p>
      </div>
      <div className="basis-1/4 justify-center items-center flex text-center">
        <p className="text-text text-base max-md:text-xs">{creation_date}</p>
      </div>
      <div className="flex justify-center items-center basis-1/4 gap-4 max-md:gap-1">
        <div>
          <button onClick={handleNotificationDelete}>
            <div className="bg-secondary rounded-full aspect-square h-10 flex justify-center items-center max-md:h-5 transition ease-in-out hover:scale-110">
              <i className="uil uil-trash-alt text-accent-100 text-2xl max-md:text-base"></i>
            </div>
          </button>
        </div>
        <div
          className={`${
            is_read ? "invisible" : null
          } bg-primary rounded-full aspect-square h-2`}
        ></div>
      </div>
    </div>
  );
};

export default Index;
