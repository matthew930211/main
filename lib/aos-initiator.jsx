"use client"

import Aos from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";

const AOSInitiator = ({ children }) => {
    useEffect(() => {
        Aos.init({
            duration: 2500,
            delay: 400
        })
    })

    return <>{children}</>

}

export default AOSInitiator