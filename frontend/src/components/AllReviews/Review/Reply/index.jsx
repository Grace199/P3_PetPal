import React from 'react'

const Reply = ({ name, isReplyingToSelf, timestamp, content }) => {
    const jsDate = new Date(timestamp);

    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
    const day = jsDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return (
        <div className="flex flex-col gap-[2px] sm:gap-1">
            <div className="flex flex-row gap-2">
                {isReplyingToSelf ? <p className="text-accent-100 text-xs sm:text-sm font-semibold">{name}</p> : <p className="text-xs sm:text-sm font-semibold">{name}</p>}
                <p className="text-gray text-xs sm:text-sm">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2">
                <div className="w-[2px]"></div>
                <p className="text-xs sm:text-sm">{content}</p>
            </div>
        </div>
    )
}

export default Reply