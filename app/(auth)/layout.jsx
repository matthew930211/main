import Navbar from "@/components/HomePage/Navbar/Navbar";
import Image from "next/image";

const AuthLayout = ({ children }) => {

    return (
        <div>
            <Navbar />
            <div className="w-full flex items-start justify-center overflow-hidden min-h-[100vh] lg:min-h-[70vh] mt-28 lg:mt-32">
                <div>
                    <div className="w-[90%] md:w-[70%] mx-auto mb-10 flex flex-col items-center justify-center gap-y-6">
                        <Image src={"/assets/images/logo3.png"} alt="Freecourselist" width={80} height={80} className="rounded-full" />
                        {/* <h1 className="text-3xl md:text-4xl lg:text-4xl text-center text-[#c1dcf1]">Join Today & Start Learning for Real!</h1> */}
                    </div>

                    <div className="flex items-center justify-center">
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;