import React from 'react'
import { Link } from 'react-router-dom'

const Chatroom = () => {
    return (
        <main className="h-full">
            <div className="flex flex-row h-full">
                <div className="bg-background-secondary w-full md:w-[360px] h-full flex flex-col">
                    <div className="md:bg-[#D7D7D7]">
                        <a href="chatroomOpenChat.html" className="h-[90px] flex flex-row gap-5 items-center hover:bg-background pl-4">
                            <img src="../../assets/images/DS.jpg" className="rounded-full hover:scale-105 duration-200 w-[56px] aspect-square object-cover" />
                            <div>
                                <p className="text-[#030711] text-base">Dog Society</p>
                                <p className="text-[#5F5F5F] text-xs">Active 8h ago</p>
                            </div>
                        </a>
                    </div>
                    <div className="md:border-t md:border-r md:border-[#A4A4A4] md:border-[0.5px] h-full">
                        <div className="h-[90px] flex flex-row gap-5 items-center hover:bg-background pl-4">
                            <img src="../../assets/images/DS.jpg" className="rounded-full hover:scale-105 duration-200 w-[56px] aspect-square object-cover" />
                            <div>
                                <p className="text-[#030711] text-base">Dog Society 2</p>
                                <p className="text-[#5F5F5F] text-xs">Active 8h ago</p>
                            </div>
                        </div>
                        <div className="h-[90px] flex flex-row gap-5 items-center hover:bg-background pl-4">
                            <img src="../../assets/images/DS.jpg" className="rounded-full hover:scale-105 duration-200 w-[56px] aspect-square object-cover" />
                            <div>
                                <p className="text-[#030711] text-base">Dog Society 3</p>
                                <p className="text-[#5F5F5F] text-xs">Active 8h ago</p>
                            </div>
                        </div>
                        <div className="h-[90px] flex flex-row gap-5 items-center hover:bg-background pl-4">
                            <img src="../../assets/images/DS.jpg" className="rounded-full hover:scale-105 duration-200 w-[56px] aspect-square object-cover" />
                            <div>
                                <p className="text-[#030711] text-base">Dog Society 4</p>
                                <p className="text-[#5F5F5F] text-xs">Active 8h ago</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background-secondary w-full hidden md:flex md:flex-col md:justify-end px-4 py-4 md:px-8 md:py-6 lg:px-14 lg:py-8 gap-5">
                    <div className="w-full flex flex-row items-start md:items-center gap-3">
                        <div className="w-[32px] md:w-[56px]">
                            <img src="../../assets/images/DS.jpg" className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[32px] md:w-[56px] aspect-square object-cover" />
                        </div>
                        <div className="w-full flex flex-col">
                            <div className="flex flex-row items-baseline gap-2">
                                <p className="text-[#030711] max-sm:text-sm font-bold">Dog Society</p>
                                <p className="text-[#6F6F6F] text-[8px] sm:text-[10px]">Today at 3:18pm</p>
                            </div>
                            <div>
                                <p className="text-[#030711] max-sm:text-sm">Hello there, thank you for your interest in adopting ChickenSoup123, feel free to reach out for any questions!</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-start md:items-center gap-3">
                        <div className="w-[32px] md:w-[56px]">
                            <img src="../../assets/images/MISHU.jpg" className="rounded-full hover:scale-105 active:scale-95 duration-200 w-[32px] md:w-[56px] aspect-square object-cover" />
                        </div>
                        <div className="w-full flex flex-col">
                            <div className="flex flex-row items-baseline gap-2">
                                <p className="text-[#030711] max-sm:text-sm font-bold">MISHU</p>
                                <p className="text-[#6F6F6F] text-[8px] sm:text-[10px]">Today at 3:20pm</p>
                            </div>
                            <div>
                                <p className="text-[#030711] max-sm:text-sm">DOES IT COME WITH A SADDLE FOR ME TO RIDE ON!?!?!?</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full relative flex items-center h-14 mt-4">
                        <input type="text" className="absolute top-0 left-0 w-full h-full bg-background border-[#A4A4A4] border-[0.5px] rounded-[28px] px-6" placeholder="Send a message..." />
                        <a href="#" className="absolute text-accent-100 right-6">Send</a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Chatroom