import Link from "next/link"

const CheckoutFailedPage = () => {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <h1 className="text-white font-semibold text-4xl text-center py-4">Checkout Failed</h1>
            <p className="text-neutral-400 w-[30%] mx-auto text-center">We&apos;re sorry, but your payment couldn't be processed at this time. Please check your payment details and try again. If the issue persists, contact our support team for assistance.</p>

            <Link href={"/dashboard/settings/subscription"} className="bg-[#4F46E5] text-white px-8 py-2 rounded-md text-sm mt-6">Try Again</Link>
        </div>
    )
}

export default CheckoutFailedPage