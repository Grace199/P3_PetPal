import React from 'react'

const index = ({name, time, content, image}) => {
    return (
        <div className="w-full flex flex-row items-start md:items-center gap-3 py-5">
            <div className="w-[32px] md:w-[56px]">
                <img src={image} className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[32px] md:w-[56px] aspect-square object-cover" />
            </div>
            <div className="w-full flex flex-col">
                <div className="flex flex-row items-baseline gap-2">
                    <p className="text-[#030711] max-sm:text-sm font-bold">{name}</p>
                    <p className="text-[#6F6F6F] text-[8px] sm:text-[10px]">{time}</p>
                </div>
                <div>
                    <p className="text-[#030711] max-sm:text-sm">{content}</p>
                </div>
            </div>
        </div>
    )
}

export default index
