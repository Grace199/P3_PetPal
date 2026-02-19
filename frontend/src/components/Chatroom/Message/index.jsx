import React from 'react'

const Message = ({ name, time, content, image }) => {
    const jsDate = new Date(time);

    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
    const day = jsDate.getDate().toString().padStart(2, '0');
    let hours = jsDate.getHours();
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');

    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

    const formattedDate = `${year}-${month}-${day}   ${hours}:${minutes} ${amPM}`;

    return (
        <div className="w-full flex flex-row items-start md:items-center gap-3 py-5">
            <div className="w-[32px] md:w-[56px]">
                <img src={image} className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[32px] md:w-[56px] aspect-square object-cover" />
            </div>
            <div className="w-full flex flex-col">
                <div className="flex flex-row items-baseline gap-2">
                    <p className="text-[#030711] max-sm:text-sm font-semibold">{name}</p>
                    <p className="text-[#6F6F6F] text-[8px] sm:text-[10px]">{formattedDate}</p>
                </div>
                <div>
                    <p className="text-[#030711] max-sm:text-sm">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
