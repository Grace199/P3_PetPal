import React from 'react'

const DEFAULT_AVATAR = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/media/avatars/default-avatar.jpg";

const Message = ({ name, time, content, image, isMine }) => {
    const jsDate = new Date(time);
    let hours = jsDate.getHours();
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');
    const amPM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes} ${amPM}`;

    const avatarSrc = image && image !== "null" ? image : DEFAULT_AVATAR;

    return (
        <div className={`w-full flex items-end gap-2 py-1.5 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
            <img
                src={avatarSrc}
                alt={name}
                className="rounded-full w-8 h-8 md:w-9 md:h-9 aspect-square object-cover ring-1 ring-black/5 shrink-0"
            />
            <div className={`flex flex-col max-w-[75%] ${isMine ? "items-end" : "items-start"}`}>
                <div className={`flex items-baseline gap-2 mb-0.5 ${isMine ? "flex-row-reverse" : ""}`}>
                    <p className="text-text text-xs sm:text-sm font-semibold">{isMine ? "You" : name}</p>
                    <p className="text-text/50 text-[10px]">{formattedTime}</p>
                </div>
                <div className={`px-4 py-2 rounded-2xl text-sm sm:text-base whitespace-pre-line break-words ${
                    isMine
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white text-text border border-black/5 rounded-bl-md"
                }`}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Message
