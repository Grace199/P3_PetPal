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
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                    </div>
                </>
            );
        } else if (rating == 4) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                    </div>
                </>
            );
        } else if (rating == 3) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                    </div>
                </>
            );
        } else if (rating == 2) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                    </div>
                </>
            );
        } else if (rating == 1) {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uis uis-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="flex flex-row">
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                        <i className="uil uil-star text-3xl"></i>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div className="flex flex-row gap-5">
                <img
                    src={avatar}
                    className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[56px] aspect-square object-cover"
                />
                <p>{name}</p>
                <>{formattedDate}</>
                {renderStars()}
            </div>
        </>
    )
}

export default Review