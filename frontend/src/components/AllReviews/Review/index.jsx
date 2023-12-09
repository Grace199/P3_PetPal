import React, { useEffect, useState } from 'react'

const Review = ({ name, rating, content, timestamp, hasReplies }) => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        setAvatar(localStorage.getItem("avatar"));
    }, [avatar]);

    const jsDate = new Date(timestamp);

    // Get the individual components (year, month, day) from the Date object
    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = jsDate.getDate().toString().padStart(2, '0');

    // Form the final string in the "YYYY-MM-DD" format
    const formattedDate = `${year}-${month}-${day}`;

    const renderStars = () => {
        if (rating === 5) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating == 4) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating == 3) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating == 2) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                    </div>
                </>
            );
        } else if (rating == 1) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                        <i className="uil uil-star text-2xl"></i>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div className="hidden sm:flex flex-col gap-1">
                {content === "" ?
                    <>
                        <div className="flex flex-row gap-2 items-center">
                            <div>
                                <img
                                    src={avatar}
                                    className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <div class="flex flex-row items-center">
                                    <div class="flex flex-row items-center">
                                        <p className="text-text text-base font-bold">{name}</p>
                                        <pre className="text-2xl"> | </pre>
                                        <p className="text-text text-sm">{formattedDate}</p>
                                        <pre className="text-2xl"> | </pre>
                                        {renderStars()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-row gap-2">
                            <div className="w-[56px]"></div>
                            <div className="flex flex-col w-full gap-1">
                                <div class="flex flex-row items-center">
                                    <div class="flex flex-row items-center">
                                        <p className="text-text text-base font-bold">{name}</p>
                                        <pre className="text-2xl"> | </pre>
                                        <p className="text-text text-sm">{formattedDate}</p>
                                        <pre className="text-2xl"> | </pre>
                                        {renderStars()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                <img
                                    src={avatar}
                                    className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                                />
                            </div>
                            <div className="w-full h-12">
                                <div class="w-full h-full bg-background border-primary border-[0.5px] rounded-[15px] flex items-center px-5">
                                    <p className="text-text text-base font-light">{content}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }

            </div>
        </>
    )
}

export default Review