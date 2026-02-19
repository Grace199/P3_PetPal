import React from 'react'

const Comment = ({ id, name, img, timestamp, content }) => {
    const jsDate = new Date(timestamp);

    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
    const day = jsDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return (
        <>
            <div className="hidden sm:flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                    <div className="w-[56px]"></div>
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex flex-row items-center">
                            <div className="flex flex-row items-center gap-4">
                                <p className="text-text text-base font-bold">{name}</p>
                                <p className="text-text text-sm">{formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div>
                        <img
                            src={img}
                            className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                        />
                    </div>
                    <div className="w-full flex">
                        <div className="w-full h-full bg-background border-background-secondary border-[0.5px] rounded-[15px] flex items-center p-3">
                            <p className="text-text text-base font-light">{content}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex flex-row gap-3">
                    <div className="flex">
                        <div className="relative w-[40px] h-[40px]">
                            <img
                                src={img}
                                className="rounded-full hover:scale-105 active:scale-95 duration-200 absolute inset-0 w-full h-full aspect-square object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row gap-3">
                            <p className="text-text text-xs font-semibold">{name}</p>
                            <p className="text-text text-xs">{formattedDate}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="w-full flex">
                        <div className="w-full h-full bg-background border-background-secondary border-[0.5px] rounded-[15px] flex items-center p-3">
                            <p className="text-text font-light text-sm">{content}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Comment