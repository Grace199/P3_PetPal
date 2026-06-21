import React from 'react'

const DEFAULT_AVATAR = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/media/avatars/default-avatar.jpg";

const Comment = ({ id, name, img, timestamp, content }) => {
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    const avatarSrc = img && img !== "null" ? img : DEFAULT_AVATAR;

    return (
        <div className="flex gap-3">
            <img
                src={avatarSrc}
                className="rounded-full w-10 h-10 sm:w-11 sm:h-11 aspect-square object-cover ring-1 ring-black/5 shrink-0"
                alt={name}
            />
            <div className="flex flex-col gap-1 flex-grow min-w-0">
                <div className="flex flex-wrap items-center gap-x-2">
                    <p className="text-text text-sm sm:text-base font-bold">{name}</p>
                    <p className="text-text/60 text-xs sm:text-sm">{formattedDate}</p>
                </div>
                <div className="bg-background rounded-2xl px-4 py-3">
                    <p className="text-text text-sm sm:text-base font-light whitespace-pre-line">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment
