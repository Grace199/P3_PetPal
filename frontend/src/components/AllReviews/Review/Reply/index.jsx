import React from 'react'

const Reply = ({ name, isReplyingToSelf, timestamp, content }) => {
    const jsDate = new Date(timestamp);
    const formattedDate = jsDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-row flex-wrap items-center gap-2">
                <p className={`text-xs sm:text-sm font-semibold ${isReplyingToSelf ? "text-accent-100" : "text-text"}`}>{name}</p>
                {isReplyingToSelf && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-accent-100 bg-accent-100/10 rounded-full px-2 py-0.5">Shelter</span>
                )}
                <p className="text-text/60 text-xs sm:text-sm">{formattedDate}</p>
            </div>
            <p className="text-xs sm:text-sm text-text font-light whitespace-pre-line">{content}</p>
        </div>
    )
}

export default Reply
