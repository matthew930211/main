import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaPlus } from "react-icons/fa6"

export function FAQAccordion() {
    const faqs = [
        {
            id: "1",
            title: "How quickly can I Create a video with InstaClip?",
            description: "Depending on the video, it takes some around 2-3 minutes."
        },
        {
            id: "2",
            title: "How many videos can I create with InstaClip?",
            description: "You can create as many videos as you need as long as you have sufficient credits. To get more credits each month, refer to our other pricing plans."
        },
        {
            id: "3",
            title: "How does the quality of the video look?",
            description: "InstaClip always generates the highest-quality videos to engage your viewers."
        },
        {
            id: "4",
            title: "Why is InstaClip not free?",
            description: "Creating viral video in seconds is a luxury everyone can't have."
        }
    ]
    return (
        <Accordion type="single" collapsible className="w-full lg:w-[60%] mt-10">
            {
                faqs.map((item, i) => (
                    <AccordionItem key={i} value={item?.id} className="border-[#c1dcf1] border-none">
                        <AccordionTrigger>
                            <div className="!text-neutral-200 flex items-start lg:items-center gap-x-2 text-xl">
                                <FaPlus className="text-[#c1dcf1]/50" />
                                <span className="text-[#c1dcf1] font-light text-left">
                                    {item?.title}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-[#c1dcf1]">
                            {item?.description}
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}
