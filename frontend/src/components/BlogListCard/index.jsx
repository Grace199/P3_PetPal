import React from 'react'
import { Link } from 'react-router-dom';

const BlogListCard = ({ id, img, title, shelter, timestamp, articleType }) => {
    const displayTextForArticleType = (type) => {
        switch (type) {
            case 'other':
                return 'Other';
            case 'pet_training':
                return 'Pet Training';
            case 'pet_care':
                return 'Pet Care';
            case 'adoption_tips':
                return 'Adoption Tips';
            default:
                return '';
        }
    };

    const formattedArticleType = displayTextForArticleType(articleType);

    return (
        <Link
            className="w-full flex flex-col sm:flex-row rounded-3xl gap-3 sm:gap-9 bg-background hover:bg-background-secondary hover:scale-105 duration-200 active:scale-95 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            to={`/blogs/${id}/`}
        >
            <img
                src={img}
                alt={shelter}
                className="object-cover aspect-square h-49 sm:h-48 rounded-l-3xl"
            />
            <div className="w-full flex flex-col gap-[2px] sm:gap-1 justify-center pl-3 pb-3 sm:pl-0 sm:pb-3">
                <div className="flex items-baseline gap-2 sm:gap-5">
                    <div className="flex">
                        <p className="text-accent-100 text-xl sm:text-4xl lg:text-5xl font-bold">
                            {title}
                        </p>
                    </div>
                    <div className="flex h-full">
                        <p className="text-gray text-xs sm:text-base font-semibold text-end">
                            {formattedArticleType}
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <p className="text-accent-200 text-sm sm:text-xl lg:text-2xl font-semibold">
                        {shelter}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default BlogListCard