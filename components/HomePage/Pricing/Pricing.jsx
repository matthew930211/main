"use client"

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { TiTick } from "react-icons/ti"

const Pricing = () => {
    const [selectedMonthly, setSelectedMonthly] = useState(true);
    const [selected, setSelected] = useState(false);

    const handleSwitchChange = (checked) => {
        setSelectedMonthly(!checked);
    };

    const plans = {
        free: {
            price: "0",
            features: [
                "Discord Presence",
                "Advanced Analytics",
                "Embeds",
                "Comments",
            ]
        },
        monthly: {
            price: "8.99",
            features: [
                "Discord Presence",
                "Advanced Analytics",
                "Embeds",
                "Comments",
                "GIF Support",
                "Avatar Decorations"
            ]
        },
        yearly: {
            price: "79.99",
            features: [
                "Animations and effects",
                "Unlock all fonts",
                "Custom Cursor",
                "Cursor Trails",
                "Background Audio & Video",
                "Audio Visualizer",
                "Icon Styles",
                "Premium Badge & Discord Role",
                "Priority Support"
            ]
        }
    }

    return (
        <div id='pricing' className='scroll-mt-20'>
            <h2 className='text-white text-4xl md:text-5xl font-bold text-center px-4 md:px-0'>Our affordable pricing plan</h2>
            <p className='text-neutral-400 text-center mt-4'>7 Days Free Trial. No credit Card Required</p>

            <div>
                <div className="flex items-center space-x-4 justify-center pt-10">
                    <Label htmlFor="monthly" className={`${selectedMonthly ? "font-semibold text-white" : "border-none text-neutral-400"} px-4 py-2 rounded-full`}>Bill Monthly</Label>
                    <Switch id="Duration" onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="yearly" className={`${!selectedMonthly ? "font-semibold text-white" : "border-none text-neutral-400"} px-4 py-2 rounded-full`}>Bill Yearly</Label>
                </div>

                <div className='flex items-center justify-center max-w-7xl mx-auto mt-20'>
                    <div className='grid gird-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-10'>
                        <div className="w-[90%] mx-auto lg:mx-0 lg:w-[400px] relative shadow-lg bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl p-6 flex flex-col transition duration-300 overflow-hidden pricing-card">
                            <div className="absolute -inset-10 bg-gradient-to-r from-blue-500 to-purple-800 opacity-20"></div>
                            <div className='flex items-center gap-x-2'>
                                <div className="w-3.5 h-3.5 bg-neutral-200 rounded-full"></div>
                                <span className='text-white text-2xl font-semibold'>Free</span>
                            </div>

                            <div className='text-neutral-400 mt-2'>
                                A simple and easy-to-use plan to get you started
                            </div>

                            <hr className='border-dashed border-neutral-500/50 my-4' />

                            <div className=''>
                                <span className='text-white font-semibold text-5xl'>$0</span>
                                <span className='text-neutral-400 text-sm ml-2'>/ lifetime</span>
                            </div>

                            <div>
                                <p className='text-neutral-400 text-sm mt-4'>Basic Features, plus: </p>
                            </div>

                            <ul className="mt-4 mb-6 z-10 flex-grow">
                                {plans.free.features.map((feature, index) => (
                                    <li key={index} className="text-neutral-300 mb-2 flex items-center">
                                        <svg
                                            className="w-5 h-5 text-gray-400 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            {/* <button
                                className="mt-auto bg-gradient-to-r from-[#647ebd] to-[#4e4e8b] backdrop-blur-sm text-white px-6 py-2 rounded-md shadow-inner shadow-white/10 hover:shadow-2xl transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-10 pricing-card animate-shimmer relative font-semibold"

                            >
                                <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full blur-xs py-4 bg-white bg-opacity-20 -z-10 rounded-md opacity-50'>

                                </div>
                                Get Started
                            </button> */}

                            <div className="price-btn-container">
                                <div className="price-btn"><Link href="#">Get Started</Link></div>
                            </div>
                        </div>

                        {
                            selectedMonthly ? (
                                <div className="-order-1 lg:order-1 w-[90%] mx-auto lg:mx-0 lg:w-[400px] relative shadow-lg bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl p-6 flex flex-col transition duration-300 overflow-hidden pricing-card">
                                    <div className="absolute -inset-10 bg-gradient-to-r from-blue-500 to-purple-800 opacity-20"></div>
                                    <div className='flex items-center gap-x-2'>
                                        <div className="w-3.5 h-3.5 bg-cyan-500 animate-pulse rounded-full"></div>
                                        <span className='text-white text-2xl font-semibold'>Premium</span>
                                    </div>

                                    <div className='text-neutral-400 mt-2'>
                                        A simple and easy-to-use plan to get you started
                                    </div>

                                    <hr className='border-dashed border-neutral-500/50 my-4' />

                                    <div className=''>
                                        <span className='text-white font-semibold text-5xl'>${plans.monthly.price}</span>
                                        <span className='text-neutral-400 text-sm ml-2'>/ mo</span>
                                    </div>

                                    <div>
                                        <p className='text-neutral-400 text-sm mt-4'>Basic Features, plus: </p>
                                    </div>

                                    <ul className="mt-4 mb-6 z-10">
                                        {plans.monthly.features.map((feature, index) => (
                                            <li key={index} className="text-neutral-300 mb-2 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-gray-400 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className='text-neutral-400 mb-6 text-xs'>
                                        You will be charged ${plans.monthly.price} today that will start a new billing cycle. For more information read our{" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Terms</Link>
                                        </span>
                                        {" "}
                                        <span>and</span>
                                        {" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Privacy Policy</Link>
                                        </span>
                                    </p>
                                    <div className="price-btn-container">
                                        <div className="price-btn">
                                            <Link href="#" className='flex items-center gap-x-2'>
                                                Upgrade Now
                                                <FaArrowRightLong />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="-order-1 lg:order-1 w-[90%] mx-auto lg:mx-0 lg:w-[400px] relative shadow-lg bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl p-6 flex flex-col transition duration-300 overflow-hidden pricing-card">
                                    <div className="absolute -inset-10 bg-gradient-to-r from-blue-500 to-purple-800 opacity-20"></div>
                                    <div className='flex items-center gap-x-2'>
                                        <div className="w-3.5 h-3.5 bg-cyan-500 rounded-full"></div>
                                        <span className='text-white text-2xl font-semibold'>Premium</span>
                                    </div>

                                    <div className='text-neutral-400 mt-2'>
                                        A simple and easy-to-use plan to get you started
                                    </div>

                                    <hr className='border-dashed border-neutral-500/50 my-4' />

                                    <div className=''>
                                        <span className='text-white font-semibold text-5xl'>${plans.yearly.price}</span>
                                        <span className='text-neutral-400 text-sm ml-2'>/ year</span>
                                    </div>

                                    <div>
                                        <p className='text-neutral-400 text-sm mt-4'>Basic Features, plus: </p>
                                    </div>

                                    <ul className="mt-4 mb-6 z-10">
                                        {plans.yearly.features.map((feature, index) => (
                                            <li key={index} className="text-neutral-300 mb-2 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-gray-400 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className='text-neutral-400 mb-6 text-xs'>
                                        You will be charged ${plans.monthly.price} today that will start a new billing cycle. For more information read our{" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Terms</Link>
                                        </span>
                                        {" "}
                                        <span>and</span>
                                        {" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Privacy Policy</Link>
                                        </span>
                                    </p>
                                    <div className="price-btn-container">
                                        <div className="price-btn">
                                            <Link href="#" className='flex items-center gap-x-2'>
                                                Upgrade Now
                                                <FaArrowRightLong />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* {
                            selectedMonthly ? (
                                <div className="w-[90%] mx-auto lg:mx-0 lg:w-[400px] relative bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 flex flex-col shadow-lg hover:shadow-2xl transform scale-100 lg:scale-105 transition duration-300 overflow-hidden pricing-card">
                                    <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-800 opacity-20 blur-3xl animate-float"></div>

                                    <div className='flex items-center gap-x-2'>
                                        <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full animate-pulse-glow"></div>
                                        <span className='text-white text-2xl font-semibold'>Premium</span>
                                    </div>

                                    <div className='text-neutral-400 mt-2'>
                                        This is our most comprehensive and feature-rich plan
                                    </div>

                                    <hr className='border-dashed border-neutral-500/50 my-4' />

                                    <div className=''>
                                        <span className='text-white font-semibold text-5xl'>${plans.monthly.price}</span>
                                        <span className='text-neutral-400 text-sm ml-2'>/ mo</span>
                                    </div>

                                    <div>
                                        <p className='text-neutral-400 text-sm mt-4'>Everything in Free, plus: </p>
                                    </div>

                                    <ul className="mt-4 mb-6 z-10">
                                        {plans.monthly.features.map((feature, index) => (
                                            <li key={index} className="text-neutral-300 mb-2 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-gray-400 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className='text-neutral-400 mb-6 text-xs'>
                                        You will be charged ${plans.monthly.price} today that will start a new billing cycle. For more information read our{" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Terms</Link>
                                        </span>
                                        {" "}
                                        <span>and</span>
                                        {" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Privacy Policy</Link>
                                        </span>
                                    </p>
                                    <button
                                        className="mt-auto bg-transparent bg-opacity-10 backdrop-blur-md text-white px-6 py-2 rounded-md shadow-inner shadow-white/10 hover:shadow-2xl transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-10 pricing-card flex items-center justify-center gap-x-2"

                                    >
                                        Upgrade Now
                                        <FaArrowRightLong />
                                    </button>

                                </div>
                            ) : (
                                <div className="w-[90%] mx-auto lg:mx-0 lg:w-[400px] relative bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 flex flex-col shadow-lg hover:shadow-2xl transform scale-100 lg:scale-105 transition duration-300 overflow-hidden pricing-card">
                                    <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-800 opacity-20 blur-3xl animate-float"></div>
                                    <div className='flex items-center gap-x-2'>
                                        <div className="w-3.5 h-3.5 bg-cyan-400 rounded-full animate-pulse-glow"></div>
                                        <span className='text-white text-2xl font-semibold'>Premium</span>
                                    </div>

                                    <div className='text-neutral-400 mt-2'>
                                        This is our most comprehensive and feature-rich plan
                                    </div>

                                    <hr className='border-dashed border-neutral-500/50 my-4' />

                                    <div className=''>
                                        <span className='text-white font-semibold text-5xl'>${plans.yearly.price}</span>
                                        <span className='text-neutral-400 text-sm ml-2'>/ year</span>
                                    </div>

                                    <div>
                                        <p className='text-neutral-400 text-sm mt-4'>Everything in Free, plus: </p>
                                    </div>

                                    <ul className="mt-4 mb-6 z-10">
                                        {plans.yearly.features.map((feature, index) => (
                                            <li key={index} className="text-neutral-300 mb-2 flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-gray-400 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className='text-neutral-400 mb-6 text-xs'>
                                        You will be charged ${plans.yearly.price} today that will start a new billing cycle. For more information read our{" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Terms</Link>
                                        </span>
                                        {" "}
                                        <span>and</span>
                                        {" "}
                                        <span className='text-white'>
                                            <Link href={"/"}>Privacy Policy</Link>
                                        </span>
                                    </p>
                                    <button
                                        className="mt-auto bg-transparent bg-opacity-10 backdrop-blur-md text-white px-6 py-2 rounded-md shadow-inner shadow-white/10 hover:shadow-2xl transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 z-10 pricing-card flex items-center justify-center gap-x-2"

                                    >
                                        Upgrade Now
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                            )
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing