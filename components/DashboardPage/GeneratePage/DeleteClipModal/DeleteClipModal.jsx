"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useEffect, useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaSave } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const DeleteClipModal = ({ title, asset_url, isDeleting, setIsDeleting, handleDelete,isOpen, setIsOpen }) => {
  // const [isLoading, setIsLoading] = useState(false);


  const { user, isLoaded, isSignedIn } = useUser();
  const { toast } = useToast();


  // const handleDelete = async () => {
  //   if (!asset_url) return;

  //   setIsLoading(true);

  //   try {
  //     const res = await axios.delete(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/delete-upload${asset_url}`);
  //     if (res?.data?.success) {
  //       const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/delete-asset`, {
  //         user_id: user?.id,
  //         asset_url: asset_url,
  //       });

  //       if (response?.data?.success) {
  //         const targetUrl = `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads${asset_url}`;
  //         console.log("target url : ", targetUrl)
  //         let filteredVideos = videos?.filter(item => String(item?.location) != String(asset_url));
  //         console.log('filteredVideos : ', filteredVideos);
  //         let filteredVideoUrls = videoUrls?.filter(item => String(item) != String(targetUrl));
  //         console.log("filteredVideoUrls : ", filteredVideoUrls)
  //         setVideos(filteredVideos);
  //         setVideoUrls(filteredVideoUrls);
  //         setTotalVideos((prevTotal) => prevTotal - 1);

  //         toast({
  //           variant: "success",
  //           description: "Clip Deleted",
  //         });


  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast({
  //       variant: "destructive",
  //       description: "Failed to delete clip",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //     setIsOpen(false);
  //   }
  // };



  return (
    (isSignedIn && isLoaded) && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-2 bg-[#9e3333] !text-white py-2 px-3 rounded hover:bg-[#802e2e] flex items-center justify-center gap-x-2 border-none">
            <MdDelete />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] !bg-[#162845] border-none">
          <DialogHeader>
            <DialogTitle className="text-neutral-300">Are you sure you want to delete this clip? {title}</DialogTitle>
            {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> */}
          </DialogHeader>
          <DialogFooter>
            <button disabled={isDeleting} onClick={() => handleDelete(asset_url)} className={`bg-[#9e3333] disabled:bg-[#9e3333]/50 hover:bg-[#802e2e] !text-white py-2 ${isDeleting ? "px-8" : "px-3"} rounded flex items-center justify-center gap-x-2 border-none text-sm`}>
              {
                isDeleting ? (<AiOutlineLoading3Quarters className="animate-spin" />) : (<div className="flex items-center gap-x-2">
                  <MdDelete />
                  Delete Clip
                </div>)
              }
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  )
}

export default DeleteClipModal