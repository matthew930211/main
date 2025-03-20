"use client"

import { SignIn } from "@clerk/nextjs";

export const runtime = 'edge';

const Page = () => {
    return (
        <SignIn afterSignInUrl="/dashboard" signUpUrl="/sign-up" />
    );
}

export default Page