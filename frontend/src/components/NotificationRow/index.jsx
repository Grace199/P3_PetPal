import React from "react";
import handleNotificationDelete from "../../pages/Notifications/index";
import { ajax_or_login } from "../../util/ajax";

const index = ({ msg, creation_date, is_read, url, key }) => {
  const handleNotificationDelete = async (key) => {
    try {
      await ajax_or_login(`/notification/${key}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className={`${
        is_read ? "bg-[#E8E8E8]" : "bg-white"
      } h-20 flex justify-around items-center xl:mx-desktop md:mx-tablet mx-mobile p-3 max-md:p-1 border-b border-light-gray hover:bg-light-gray`}
    >
      <div className="basis-1/2 flex justify-center items-center text-center">
        <p className="text-text text-base font-light max-md:text-xs">{msg}</p>
      </div>
      <div className="basis-1/4 justify-center items-center flex text-center">
        <p className="text-text text-base max-md:text-xs">{creation_date}</p>
      </div>
      <div className="flex justify-center items-center basis-1/4 gap-4 max-md:gap-1">
        <div>
          <button onClick={handleNotificationDelete(key)}>
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

export default index;
