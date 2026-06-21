import React from 'react'
import { Link } from 'react-router-dom';

const ARTICLE_TYPES = {
    other: 'Other',
    pet_training: 'Pet Training',
    pet_care: 'Pet Care',
    adoption_tips: 'Adoption Tips',
};

const BlogListCard = ({ id, img, title, shelter, timestamp, articleType }) => {
    const formattedArticleType = ARTICLE_TYPES[articleType] || 'Other';
    const formattedDate = timestamp
        ? new Date(timestamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "";

    return (
        <Link
            className="group w-full flex flex-row rounded-2xl overflow-hidden bg-white border border-black/5 hover:-translate-y-1 active:translate-y-0 transition duration-200"
            to={`/blogs/${id}/`}
        >
            <img
                src={img}
                alt={shelter}
                className="object-cover aspect-square w-28 sm:w-44 shrink-0"
            />
            <div className="w-full flex flex-col justify-center gap-1.5 p-4 sm:p-6 min-w-0">
                <span className="w-max text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-accent-100 bg-accent-100/10 rounded-full px-2.5 py-1">
                    {formattedArticleType}
                </span>
                <p className="text-text text-lg sm:text-2xl lg:text-3xl font-bold leading-snug line-clamp-2 group-hover:text-accent-100 duration-200">
                    {title}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 text-text/60 text-xs sm:text-sm">
                    <span className="font-semibold text-accent-200">{shelter}</span>
                    {formattedDate && <span aria-hidden>·</span>}
                    <span>{formattedDate}</span>
                </div>
            </div>
        </Link>
    )
}

export default BlogListCard
