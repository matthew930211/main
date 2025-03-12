"use client"

import React from 'react'
import { useCookies } from 'react-cookie';
import CookieConsent from '../CookieConsent/CookieConsent';

const CookieConsentContainer = () => {
    const [cookies, setCookie] = useCookies(["cookieConsent"]);

    const giveCookieConsent = () => {
        console.log("clicked")
        setCookie("cookieConsent", true, { path: "/" })
    }

    return (
        !cookies.cookieConsent && (
            <CookieConsent cookies={cookies} setCookie={setCookie} giveCookieConsent={giveCookieConsent} />
        )
    )
}

export default CookieConsentContainer