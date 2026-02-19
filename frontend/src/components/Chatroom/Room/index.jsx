import React from 'react'

const Room = ({ chatID, setChatID, image, name, petName }) => {
    return (
        <button className="md:bg-[#D7D7D7]" onClick={() => setChatID(chatID)}>
            <div className="h-[90px] flex flex-row gap-5 justify-left items-center hover:bg-background pl-4" >
                <img src={image} className="rounded-full hover:scale-105 duration-200 w-[56px] aspect-square object-cover" />
                <div>
                    <p className="text-[#030711] text-base text-left font-semibold">{name}</p>
                    <p className="text-[#5F5F5F] text-xs text-left">{petName}</p>
                </div>
            </div>
        </button>
    )
}

export default Room
