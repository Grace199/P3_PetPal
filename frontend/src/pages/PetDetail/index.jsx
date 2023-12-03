import React from 'react'
import {useParams, Link} from 'react-router-dom'
import backdrop from '../../assets/images/Home/heroBanner.jpg'

const Index = () => {
    const { petID } = useParams();
    console.log(petID);
    return (
        <main className="px-mobile md:px-tablet xl:px-desktop py-10">

            <img
                src={backdrop}
                className="rounded-3xl object-cover w-full max-h-[500px] mb-5 md:hidden"
                alt='pic of animal'
            />
            <div className="grid md:grid-cols-12 gap-[20px]">
                <div className="md:col-span-7 bg-white rounded-3xl">
                    <div
                        className="bg-primary text-white p-7 px-8 xl:px-16 text-5xl font-bold rounded-t-3xl flex justify-between max-md:flex-col gap-5"
                    >
                        <h1>Rover</h1>
                        <div
                            className="text-xl bg-green-400 text-text px-6 lg:px-12 py-1 text-center rounded-xl flex justify-center items-center w-max"
                        >
                            <h2>AVAILABLE</h2>
                        </div>
                    </div>

                    <div className="px-8 xl:px-16 py-5">
                        <p>Golden Retriever & Collie mix</p>
                        <p>Toronto, Ontario</p>
                        <p>Adult • Female • Extra Large</p>
                        <p>Published August 8, 2023</p>
                        <hr className="text-gray my-5 opacity-50" />
                        <div className="my-3">
                            <p className="font-bold">Characteristics</p>
                            <p>Friendly, Energetic, Adventerous</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Health</p>
                            <p>Spayed/Neutered, Vaccinated</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Weight</p>
                            <p>103 lbs</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Coat Length</p>
                            <p>Long, Curly</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Special Needs</p>
                            <p>Impaired hearing</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Colours</p>
                            <p>Golden</p>
                        </div>
                        <div className="my-3">
                            <p className="font-bold">Adoption Fee</p>
                            <p>$600</p>
                        </div>
                        <hr className="text-gray my-5 opacity-50" />
                        <h2 className="text-4xl text-primary">Say hello to Rover</h2>
                        <p className="whitespace-pre-line py-3">
                            Hello there! I'm Rover, and I'm the perfect blend of Golden Retriever and Collie, resulting in a one-of-a-kind pup with a heart full of love and boundless enthusiasm.

                            I may not have the ability to type this myself, but if I could, I'd tell you how much I adore head pats and belly rubs. Nothing makes me happier than spending time with my human friends, and I'll happily soak up all the affection you're willing to give.

                            I'm a laid-back kind of guy who prefers to keep all four paws on solid ground. I've got a gentle soul and a friendly disposition that makes me the ideal companion. Walks in the park, a game of fetch, or simply lounging together are my favorite activities. I'm not just a pretty face; I'm also quite intelligent and eager to learn new tricks and commands. Treats are a fantastic motivator, so teaching me new things will be a breeze!

                            I'm great with other dogs and have a knack for making friends wherever I go. You'll often find me romping around with my canine pals, enjoying some quality playtime. I'm not one to bark or cause a ruckus; I'm a well-mannered and sociable pup.

                            Do you have room in your heart and home for a delightful mix like me? Whether you're looking for a faithful companion for adventures or simply a loyal friend to share your life with, I'm here, waiting for a loving forever home. Rover would thrive in a family setting or as a loyal companion to an individual or couple seeking a furry best friend.
                        </p>
                    </div>
                </div>

                <div className="md:col-span-5 flex flex-col gap-5">
                    <div className="w-full max-h-[500px] rounded-3xl max-md:hidden">
                        <img
                            src={backdrop}
                            className="rounded-3xl object-cover object-center"
                            alt='pic of animal'
                        />
                    </div>

                    <div
                        className="bg-accent-100 w-full flex flex-col justify-center items-center p-5 py-20 gap-5 rounded-3xl"
                    >
                        <h2 className="text-white text-center text-2xl lg:text-3xl font-bold">
                            Interested in adopting Rover?
                        </h2>
                        <Link to="/application"
                            className="bg-white text-accent-100 rounded-3xl py-3 px-6 lg:px-12 text-xl lg:text-2xl font-bold text-center hover:scale-105 active:scale-95 duration-200"
                        >Apply Now!</Link>
                    </div>

                    <div
                        className="bg-light-gray w-full flex flex-col justify-center items-center p-5 py-12 gap-5 rounded-3xl"
                    >
                        <div>
                            <img
                                src={backdrop}
                                className="rounded-full aspect-square h-[100px] object-cover object-center"
                                alt='shelter'
                            />
                        </div>
                        <div>
                            <h2 className="text-primary text-center text-3xl font-semibold">
                                Dog Society
                            </h2>
                            <p className="text-primary text-center text-xl font-semibold">
                                Toronto, Ontario
                            </p>
                        </div>
                        <Link to="/shelterDetail"
                            className="bg-white text-accent-100 text-center rounded-3xl py-3 px-6 lg:px-12 text-2xl font-bold hover:scale-105 active:scale-95 duration-200"
                        >Learn More</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Index
