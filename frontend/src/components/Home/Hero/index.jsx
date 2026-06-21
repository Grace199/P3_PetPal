import { useState } from 'react'
import backdrop from '../../../assets/images/Home/heroBanner.jpg';
import './style.css';
import { useNavigate } from "react-router-dom";


const Index = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        animal: 'dog',
        breed: null,
        size: null,
        age: null,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { animal, breed, size, age } = formData;
        navigate(`/petlisting?animal=${animal}${breed ? `&breed=${breed}` : ''}${size ? `&size=${size}` : ''}${age ? `&age=${age}` : ''}`)
    }

    const categories = [
        { value: "dog", label: "Dogs" },
        { value: "cat", label: "Cats" },
        { value: "other", label: "Others" },
    ];

    return (
        <div className="w-full max-md:min-h-[80vh] min-h-[70vh] relative flex justify-center items-center flex-col overflow-hidden">
            <img
                src={backdrop}
                alt="Dog and Cat cuddling"
                className="object-cover w-full h-full absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-text/55 via-primary/65 to-text/65" />

            <div className="relative flex flex-col items-center w-full px-mobile md:px-tablet xl:px-desktop py-12">
                <h1 className="text-white font-bold text-7xl sm:text-8xl text-center mb-2 [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
                    PetPal
                </h1>
                <h2 className="text-white font-semibold text-2xl sm:text-4xl text-center mb-8 [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
                    find your fur-ever friend.
                </h2>

                {/* Search panel */}
                <form
                    className="w-full max-w-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/30 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-4 sm:p-6 flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    {/* Category segmented pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-medium mr-1 max-sm:hidden">I'm looking for:</span>
                        <div className="flex gap-1 p-1 bg-white/20 rounded-xl">
                            {categories.map((c) => (
                                <label
                                    key={c.value}
                                    className={`cursor-pointer text-sm font-semibold px-4 py-1.5 rounded-lg transition duration-200 ${
                                        formData.animal === c.value
                                            ? "bg-white text-primary"
                                            : "text-white/80 hover:text-white"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="animal"
                                        value={c.value}
                                        checked={formData.animal === c.value}
                                        onChange={handleInputChange}
                                        className="sr-only"
                                    />
                                    {c.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            name="breed"
                            id="breed"
                            className="flex-grow bg-white rounded-xl px-4 py-3 text-text placeholder:text-text/50 border border-transparent focus:border-primary focus:outline-none"
                            type="text"
                            placeholder="Enter breed"
                            onChange={handleInputChange}
                        />
                        <select
                            name="size"
                            id="size"
                            className="bg-white rounded-xl px-4 py-3 text-text border border-transparent focus:border-primary focus:outline-none cursor-pointer"
                            onChange={handleInputChange}
                        >
                            <option value="">Any size</option>
                            <option value="1">Small</option>
                            <option value="2">Medium</option>
                            <option value="3">Large</option>
                        </select>
                        <select
                            name="age"
                            id="age"
                            className="bg-white rounded-xl px-4 py-3 text-text border border-transparent focus:border-primary focus:outline-none cursor-pointer"
                            onChange={handleInputChange}
                        >
                            <option value="">Any age</option>
                            <option value="1">Infant</option>
                            <option value="2">Young</option>
                            <option value="3">Adult</option>
                            <option value="4">Senior</option>
                        </select>
                        <button
                            type="submit"
                            className="bg-accent-100 text-white font-semibold rounded-xl px-6 py-3 hover:bg-accent-200 active:scale-95 transition duration-200 whitespace-nowrap"
                        >
                            Search Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Index
