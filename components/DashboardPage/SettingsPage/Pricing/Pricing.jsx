"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { X } from "lucide-react"
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { CiShoppingTag } from "react-icons/ci"
import { FaCheck } from "react-icons/fa6"
import { IoIosArrowForward } from "react-icons/io"
import { RxCross1 } from "react-icons/rx"

const Pricing = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();

    const checkoutMonthly = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_NODE_API_URL}/payments/stripe/create-checkout-session-monthly`,
                {
                    userId: user?.id,
                    email: user.emailAddresses[0].emailAddress,
                }
            );
            const data = response?.data;
            if (data?.url) {
                window.location.href = data?.url;
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);

        }
    }

    const checkoutYearly = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_NODE_API_URL}/payments/stripe/create-checkout-session-yearly`,
                {
                    userId: user?.id,
                    email: user.emailAddresses[0].emailAddress,
                }
            );
            const data = response?.data;
            if (data?.url) {
                window.location.href = data?.url;
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);

        }
    }
    return (
        <div className="w-full">
            <Tabs defaultValue="monthly" className="!w-full !bg-transparent">
                <TabsList className="w-full !bg-transparent flex items-center justify-center gap-x-2">
                    <TabsTrigger disabled={isLoading} className="rounded-full px-4" value="monthly">
                        <div className='flex items-center gap-x-2 text-sm py-1 px-1'>
                            Monthly
                        </div>
                    </TabsTrigger>
                    <TabsTrigger disabled={isLoading} className="rounded-full px-4" value="yearly">
                        <div className='flex items-center gap-x-2 text-sm py-1 px-1'>
                            Yearly
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="monthly" className="">
                    <div className="w-[90%] 2xl:w-[60%] mx-auto grid grid-cols-1 xl:grid-cols-2 mt-9 gap-10">
                        <div className="p-8 border border-neutral-600/20 rounded-xl">
                            <h3 className="text-5xl text-white font-semibold">Free</h3>
                            <p className="text-neutral-500 text-sm mt-4">
                                Generate 5 clips per day
                            </p>
                            <div className="mt-6">
                                <p className="text-neutral-300 font-semibold text-4xl">
                                    $0.00 <span className="text-neutral-500 !text-lg">/month</span>
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col gap-y-2">
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Able to copy 10 posts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Editing length of clips (unlimited)</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Create 1 voice over script</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Download Clips</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <RxCross1 className="text-neutral-300 text-md" />
                                    <p>Post your clips on social media directly</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-2 border-[#4F46E5] rounded-xl">
                            <div className="w-full flex items-center gap-x-6">
                                <h3 className="text-5xl text-white font-semibold">Basic</h3>
                                <div className="bg-[#4F46E5] rounded-md text-white flex items-center gap-x-2 -rotate-2 px-2 py-1.5 text-xs">
                                    <CiShoppingTag className="text-lg -rotate-90" />
                                    Recommended

                                </div>
                            </div>
                            <p className="text-neutral-500 text-sm mt-4">
                                Generate 20 clips per day
                            </p>
                            <div className="mt-6">
                                <p className="text-neutral-300 font-semibold text-4xl">
                                    $3.99 <span className="text-neutral-500 !text-lg">/month</span>
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col gap-y-2">
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Able to copy unlimited posts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Create 5 voice over scripts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Post 5 clips per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Save 5 drafts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Post your clips on social media directly</p>
                                </div>

                                <button onClick={() => checkoutMonthly()} disabled={isLoading} className="flex items-center justify-center gap-x-2 text-sm text-white px-4 py-2 rounded-md text-center w-full bg-gradient-to-b from-[#4F46E5] to-[#4F46E5] hover:from-[#4F46E5]/80 hover:to-[#4F46E5]/70 disabled:from-[#4F46E5]/50 disabled:to-[#4F46E5]/50 disabled:text-neutral-400 transition duration-500 ease-in-out mt-6">
                                    {isLoading && (<AiOutlineLoading3Quarters className="animate-spin" />)}
                                    Checkout
                                    {
                                        !isLoading && (<IoIosArrowForward />)
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="yearly">
                <div className="w-[90%] 2xl:w-[60%] mx-auto grid grid-cols-1 xl:grid-cols-2 mt-9 gap-10">
                        <div className="p-8 border border-neutral-600/20 rounded-xl">
                            <h3 className="text-5xl text-white font-semibold">Free</h3>
                            <p className="text-neutral-500 text-sm mt-4">
                                Generate 5 clips per day
                            </p>
                            <div className="mt-6">
                                <p className="text-neutral-300 font-semibold text-4xl">
                                    $0.00 <span className="text-neutral-500 !text-lg">/month</span>
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col gap-y-2">
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Able to copy 10 posts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Editing length of clips (unlimited)</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Create 1 voice over script</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Download Clips</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <RxCross1 className="text-neutral-300 text-md" />
                                    <p>Post your clips on social media directly</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-2 border-[#4F46E5] rounded-xl">
                            <div className="w-full flex items-center gap-x-6">
                                <h3 className="text-5xl text-white font-semibold">Basic</h3>
                                <div className="bg-[#4F46E5] rounded-md text-white flex items-center gap-x-2 -rotate-2 px-2 py-1.5 text-xs">
                                    <CiShoppingTag className="text-lg -rotate-90" />
                                    Recommended

                                </div>
                            </div>
                            <p className="text-neutral-500 text-sm mt-4">
                                Generate 20 clips per day
                            </p>
                            <div className="mt-6">
                                <p className="text-neutral-300 font-semibold text-4xl">
                                    $42.99<span className="text-neutral-500 !text-lg">/year</span>
                                </p>
                            </div>
                            <div className="mt-6 flex flex-col gap-y-2">
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Able to copy unlimited posts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Create 5 voice over scripts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Post 5 clips per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Save 5 drafts per day</p>
                                </div>
                                <div className="flex items-center gap-x-4 text-neutral-300 text-sm">
                                    <FaCheck className="text-neutral-300 text-md" />
                                    <p>Post your clips on social media directly</p>
                                </div>

                                <button onClick={() => checkoutYearly()} disabled={isLoading} className="flex items-center justify-center gap-x-2 text-sm text-white px-4 py-2 rounded-md text-center w-full bg-gradient-to-b from-[#4F46E5] to-[#4F46E5] hover:from-[#4F46E5]/80 hover:to-[#4F46E5]/70 disabled:from-[#4F46E5]/50 disabled:to-[#4F46E5]/50 disabled:text-neutral-400 transition duration-500 ease-in-out mt-6">
                                    {isLoading && (<AiOutlineLoading3Quarters className="animate-spin" />)}
                                    Checkout
                                    {
                                        !isLoading && (<IoIosArrowForward />)
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Pricing