"use client"

import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CiSettings } from 'react-icons/ci'
import { checkSubscription } from "@/lib/actions/checkSubscription";
const SettingsPageLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPro, setIsPro] = useState(false);

    const pathname = usePathname();
    const { user } = useUser();
    console.log("path : ", pathname);

    const handleBillings = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/payments/stripe/manage-billings`, {
                userId: user?.id,
            });

            const data = response?.data;

            if (data?.url) {
                window.location.href = data?.url;
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const checkingSubscription = async () => {
        try {
            const subscriptionStatus = await checkSubscription(user?.id);
            setIsPro(subscriptionStatus);
            setIsLoading(false);
            // if (!subscriptionStatus) {
            //     const { data } = await axios.post(
            //         `${process.env.REACT_APP_API_URL}/create-checkout-session`,
            //         {
            //             userId: userId,
            //             email: user.emailAddresses[0].emailAddress,
            //         }
            //     );

            //     if (data.url) {
            //         window.location.href = data.url;
            //     }
            // }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkingSubscription()
    }, [user])

    return (
        <div>
            <div className='w-[90%] lg:w-full mx-auto'>
                <h1 className='flex items-center gap-x-2 font-semibold text-white text-2xl md:text-3xl lg:text-4xl pt-6 pb-4 flex-wrap md:flex-nowrap'>
                    <CiSettings className='text-white text-3xl lg:text-3xl xl:text-4xl' />
                    Settings
                </h1>
                <p className='text-neutral-300'>
                    Manage your settings and preferences.
                </p>

                <div className='w-full flex items-center gap-x-4 gap-y-4 border-b border-neutral-100/20 mt-10 mb-4 flex-wrap md:flex-nowrap'>
                    <Link href={"/dashboard/settings"} className={`w-fit px-4 text-neutral-400 pb-2 ${pathname === "/dashboard/settings" && "border-b-2 border-neutral-300 !text-neutral-200"}`}>Profile</Link>
                    <Link href={"/dashboard/settings/subscription"} className={`w-fit px-4 text-neutral-400 pb-2 ${pathname === "/dashboard/settings/subscription" && "border-b-2 border-neutral-300 !text-neutral-200"}`}>Subscription</Link>
                    {
                        isPro && (<button disabled={isLoading} onClick={() => handleBillings()} className={`w-fit px-4 text-neutral-400 pb-2 ${isLoading && "!text-neutral-600"}`}>Manage Billings</button>)
                    }
                </div>

                {children}
            </div>
        </div>
    )
}

export default SettingsPageLayout