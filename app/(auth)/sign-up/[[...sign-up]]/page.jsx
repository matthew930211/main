"use client"

import { SignUp } from "@clerk/nextjs";

export const runtime = 'edge';

const Page = () => {
    return (
        <SignUp afterSignUpUrl="/sign-in" signInUrl="/sign-in" />
    );
}

export default Page