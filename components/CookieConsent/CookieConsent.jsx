"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { hasCookie, setCookie } from "cookies-next"
const CookieConsent = () => {
    const [showConsent, setShowConsent] = useState(true);

    useEffect(() => {
        setShowConsent(hasCookie("localConsent"))
    }, []);

    const acceptCookie = () => {
        setShowConsent(true);
        setCookie("localConsent", "true", {})
    }

    if (showConsent) {
        return null;
    }
    return (
        <div className='w-full fixed inset-0 bg-slate-700 bg-opacity-10 z-[5000]'>
            <div className='w-full mx-auto fixed bottom-0 left-0 bg-black'>
                <div className='w-[80%] mx-auto flex flex-wrap gap-y-4 items-center justify-between  px-4 py-8 text-white'>
                    <span>We use cookies to enhance your user experience. By using our website,
                        you agree to our use of cookies. {" "}
                        <Link href={""} className='underline'>Learn More</Link>
                    </span>
                    <button className='bg-[#D7A810] text-black py-2 px-8 font-semibold' onClick={() => acceptCookie()}>I understand</button>
                </div>

            </div>
        </div>
    )
}

export default CookieConsent