import Link from 'next/link'
import React from 'react'

const QuotaExceedPage = () => {
    return (
        <div className='w-full flex items-center justify-center flex-col gap-y-2 min-h-[20vh]'>
            <h4 className='font-semibold text-white text-2xl md:text-3xl lg:text-4xl mt-8 text-center'>You have reached your daily limit!</h4>
            <p className='text-neutral-500 mt-2 w-full md:w-[30%] mx-auto text-center'>
                You have reached your daily limit of usage. Come again tomorrow or upgrade to <Link href={"#"} className='underline font-bold text-neutral-200'>PRO PLAN</Link>
            </p>


        </div>
    )
}

export default QuotaExceedPage