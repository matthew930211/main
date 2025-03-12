"use client"

import { SignIn } from "@clerk/nextjs";

const Page = () => {
    return (
        <SignIn afterSignInUrl="/dashboard" signUpUrl="/sign-up" />
    );
}

export default Page