"use client"

import { SignUp } from "@clerk/nextjs";

const Page = () => {
    return (
        <SignUp afterSignUpUrl="/sign-in" signInUrl="/sign-in" />
    );
}

export default Page