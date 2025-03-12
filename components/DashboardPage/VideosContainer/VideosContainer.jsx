"use client";

import React, { useEffect, useState } from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import axios from "axios";
import { IoMdCloudDownload } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import VideosFilter from "./VideosFilter";
import DeleteClipModal from "../GeneratePage/DeleteClipModal/DeleteClipModal";
import { useUser } from "@clerk/nextjs";
import { ImSpinner3 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditClipModal from "../EditClipModal/EditClipModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMenu } from "react-icons/io5";
import PublishClipModal from "../PublishClipModal/PublishClipModal";
import VideoCard from "./VideoCard";
import { BiError } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import WriteCaptionModal from "../WriteCaptionModal/WriteCaptionModal";
import EditLengthModal from "../GeneratePage/EditLengthModal/EditLengthModal";
import PostOnSocialContainerModal from "../GeneratePage/PostOnSocialContainerModal/PostOnSocialContainerModal";
import CreateVoiceOverModal from "../GeneratePage/CreateVoiceOverModal/CreateVoiceOverModal";
import EditClipOptionsModal from "../EditClipOptionsModal/EditClipOptionsModal";

const VideosContainer = ({ userId, asset_status }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filteredVideoUrls, setFilteredVideoUrls] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalVideosFiltering, setTotalVideosFiltering] = useState(0);
  const [page, setPage] = useState(1);
  const [filterPage, setFilterPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoRenderKey, setVideoRenderKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchedResults, setSearchedResults] = useState([]);
  const [currentVideos, setCurrentVideos] = useState([]);
  const searchParams = useSearchParams();
  const insta_access_token = searchParams.get("insta_access_token");
  const insta_user_id = searchParams.get("insta_user_id");
  const insta_access_token_expires_in = searchParams.get(
    "insta_access_token_expires_in"
  );

  const limit = 18;

  const { toast } = useToast();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const fetchVideos = async (currentPage) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NODE_API_URL
        }/assets/get-videos?user_id=${userId}&&limit=${limit}&&asset_status=${asset_status}&&page=${currentPage ? currentPage : page
        }`
      );

      if (response?.data?.success) {
        setVideos([...videos, ...response?.data?.videos]);
        setTotalVideos(response?.data?.totalVideos);
        setPage(page + 1);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        variant: "default",
        description: `Something went wrong`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
    }
  };

  const fetchFreshNewVideos = async (item) => {
    try {
      // setIsLoading(true);

      // const response = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-videos?user_id=${userId}&&limit=${limit}&&asset_status=${asset_status}&&page=${currentPage ? currentPage : page}`);

      // if (response?.data?.success) {
      //     setVideos([...response?.data?.videos]);
      //     setTotalVideos(response?.data?.totalVideos);
      //     setSelectedFilter('');
      //     setPage(page + 1);
      //     setIsLoading(false);
      // }

      if (!selectedFilter) {
        setVideos([item, ...videos]);
        setVideoRenderKey(videoRenderKey + 1);
        setIsLoading(false);
        return;
      } else {
        setFilteredVideos([item, ...filteredVideos]);
        setVideoRenderKey(videoRenderKey + 1);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        variant: "default",
        description: `Something went wrong`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
      return;
    }
  };

  const fetchFreshVideos = async (currentPage) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-videos?user_id=${userId}&&asset_status=${asset_status}&&limit=${limit}&&page=1`
      );

      if (response?.data?.success) {
        setVideos([...response?.data?.videos]);
        const urls = response?.data?.videos?.map((v) => {
          let file_location = v?.location;
          return `${process.env.NEXT_PUBLIC_FLASK_API_URL}/uploads${file_location}`;
        });
        setTotalVideos(response?.data?.totalVideos);
        setPage(page + 1);
        setVideoRenderKey((prevKey) => prevKey + 1);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        variant: "default",
        description: `Something went wrong`,
        action: (
          <div className="!bg-[#6760f1] p-1 flex items-center justify-center rounded-full">
            <BiError className="!text-[#FDFFFF]" />
          </div>
        ),
      });
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      // Create a temporary link to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release object URL after the download
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download file:", error);
      toast({
        variant: "destructive",
        description: "Download Failed",
      });
    }
  };

  const filteringFunction = async (filter) => {
    if (!filter) {
      return;
    }
    try {
      console.log("filter : ", filter);

      setVideos([]);
      setIsFiltering(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-videos-by-filter?user_id=${userId}&&asset_status=${asset_status}&&limit=${limit}&&page=1&&filter=${filter}`
      );

      if (response?.data?.success) {
        setFilteredVideos([...response?.data?.videos]);
        setTotalVideosFiltering(response?.data?.totalVideos);
        setFilterPage(filterPage + 1);
        setIsFiltering(false);
        setVideos([]);
        setVideoUrls([]);
        setTotalVideos(0);
      }
    } catch (err) {
      console.log(err);
      setIsFiltering(false);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  const filteringLoadMoreFunction = async (filter) => {
    if (!filter) {
      return;
    }
    try {
      console.log("filter : ", filter);
      setIsFiltering(true);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/get-videos-by-filter?user_id=${userId}&&asset_status=${asset_status}&&limit=${limit}&&page=${filterPage}&&filter=${filter}`
      );

      if (response?.data?.success) {
        setFilteredVideos([...filteredVideos, ...response?.data?.videos]);
        setTotalVideosFiltering(response?.data?.totalVideos);
        setFilterPage(filterPage + 1);
        setIsFiltering(false);
        setVideos([]);
        setVideoUrls([]);
        setTotalVideos(0);
      }
    } catch (err) {
      console.log(err);
      setIsFiltering(false);
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    }
  };

  const handleDelete = async (asset_url, v, fetchFreshFunc) => {
    if (!asset_url) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this clip?"
    );

    if (!confirm) {
      return;
    }

    setIsDeleting(true);

    try {
      const delete_url_arr = asset_url.split("/");
      console.log("delete_url : ", delete_url_arr);
      const delete_url_str = `/${delete_url_arr[6]}/${delete_url_arr[7]}`;

      if (delete_url_str) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/delete-asset`,
          {
            user_id: user?.id,
            asset_url: asset_url,
          }
        );

        if (response?.data?.success) {
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_FLASK_API_URL}/delete-upload${delete_url_str}`
          );
          if (res?.data?.success) {
            toast({
              variant: "success",
              description: "Clip Deleted",
            });
            window.location.reload();
          } else {
            toast({
              variant: "success",
              description: "Clip Deleted",
            });
            window.location.reload();
          }
        }
      } else {
        toast({
          variant: "destructive",
          description: "Failed to delete clip",
        });
        return;
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        description: "Failed to delete clip",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }

    // const confirm = window.confirm("Are you sure you want to delete this clip?");

    // if (!confirm) {
    //     return;
    // }

    // console.log("deleting video url: ", asset_url)
    // console.log("deleting v : ", v)
    // try {
    //     const res = await axios.delete(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/delete-upload${asset_url}`);
    //     if (res?.data?.success) {
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/delete-asset`, {
    //             user_id: user?.id,
    //             asset_url: asset_url,
    //         });

    //         if (response?.data?.success) {
    //             toast({
    //                 variant: "success",
    //                 description: "Clip Deleted",
    //             });

    //             fetchFreshFunc()
    //         }
    //     }
    // } catch (err) {
    //     console.error(err);
    //     toast({
    //         variant: "destructive",
    //         description: "Failed to delete clip",
    //     });
    // } finally {
    //     setIsDeleting(false);
    //     setIsOpen(false);
    // }
  };

  const handleDeleteForFilter = async (asset_url, v, fetchFreshFunc) => {
    if (!asset_url) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this clip?"
    );

    if (!confirm) {
      return;
    }

    setIsDeleting(true);

    try {
      const delete_url_arr = asset_url.split("/");
      console.log("delete_url : ", delete_url_arr);
      const delete_url_str = `/${delete_url_arr[6]}/${delete_url_arr[7]}`;

      if (delete_url_str) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/delete-asset`,
          {
            user_id: user?.id,
            asset_url: asset_url,
          }
        );

        if (response?.data?.success) {
          const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_FLASK_API_URL}/delete-upload${delete_url_str}`
          );

          if (res?.data?.success) {
            toast({
              variant: "success",
              description: "Clip Deleted",
            });
            window.location.reload();
          } else {
            toast({
              variant: "success",
              description: "Clip Deleted",
            });
            window.location.reload();
          }
        }
        if (response?.data?.success) {
        }
      } else {
        toast({
          variant: "destructive",
          description: "Failed to delete clip",
        });
        return;
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        description: "Failed to delete clip",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }

    // const confirm = window.confirm("Are you sure you want to delete this clip?");

    // if (!confirm) {
    //     return;
    // }

    // console.log("deleting video url: ", asset_url)
    // console.log("deleting v : ", v)
    // try {
    //     const res = await axios.delete(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/delete-upload${asset_url}`);
    //     if (res?.data?.success) {
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/delete-asset`, {
    //             user_id: user?.id,
    //             asset_url: asset_url,
    //         });

    //         if (response?.data?.success) {
    //             toast({
    //                 variant: "success",
    //                 description: "Clip Deleted",
    //             });

    //             fetchFreshFunc()
    //         }
    //     }
    // } catch (err) {
    //     console.error(err);
    //     toast({
    //         variant: "destructive",
    //         description: "Failed to delete clip",
    //     });
    // } finally {
    //     setIsDeleting(false);
    //     setIsOpen(false);
    // }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    setIsSearching(true);
    // console.log("search query : ", searchQuery)

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/search?query=${searchQuery}&&asset_status=${asset_status}&&user_id=${user?.id}`
      );
      const data = res?.data;

      if (data?.success) {
        // if (selectedFilter) {
        //     // setCurrentVideos(filteredVideos);
        //     setFilteredVideos(res?.data?.videos);
        // } else {
        //     // setCurrentVideos(videos)
        //     setVideos(res?.data?.videos);
        // }
        setSearchedResults(data?.videos);
        setIsSearching(false);
        setIsSearched(true);
      }
    } catch (err) {
      console.log(err);
      setIsSearching(false);
    }
  };

  const setCurrentVideosNull = async () => {
    if (selectedFilter) {
      // setFilteredVideos(currentVideos);
      // setCurrentVideos([]);
      setSearchedResults([]);
      setIsSearched(false);
      // fetchVideos(1);
    } else {
      // setVideos(currentVideos);
      // setCurrentVideos([]);
      setSearchedResults([]);
      setIsSearched(false);
      // fetchVideos(1);
    }
  };

  useEffect(() => {
    if (filterPage === 1) {
      setCurrentVideos([]);
      filteringFunction(selectedFilter);
    }
  }, [filterPage, selectedFilter]);

  useEffect(() => {
    if (userId) {
      fetchVideos();
    }
  }, [userId]);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (
        insta_user_id &&
        insta_access_token &&
        insta_access_token_expires_in
      ) {
        window.localStorage.setItem(
          "insta_user_id",
          JSON.stringify(insta_user_id)
        );
        window.localStorage.setItem(
          "insta_access_token",
          JSON.stringify(insta_access_token)
        );
        window.localStorage.setItem(
          "insta_access_token_expires_in",
          insta_access_token_expires_in
        );
      }
    }
  }, [insta_user_id, insta_access_token, insta_access_token_expires_in]);

  return (
    isLoaded &&
    isSignedIn && (
      <div className="relative">
        <VideosFilter
          userId={userId}
          filterPage={filterPage}
          setFilterPage={setFilterPage}
          totalVideos={totalVideos}
          setTotalVideos={setTotalVideos}
          isFiltering={isFiltering}
          setIsFiltering={setIsFiltering}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          filteredVideos={filteredVideos}
          setFilteredVideos={setFilteredVideos}
          filteredVideoUrls={filteredVideoUrls}
          setFilteredVideoUrls={setFilteredVideoUrls}
          filteringFunction={filteringFunction}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentVideosNull={setCurrentVideosNull}
          isSearching={isSearching}
        />

        <div className="mb-6">
          {isSearched && !isSearching && (
            <h3 className="pb-4 text-white text-2xl">Your Searched Results</h3>
          )}

          {isSearched && searchedResults?.length === 0 && !isSearching && (
            <p className="text-neutral-200">No clips found</p>
          )}
          <div
            key={videoRenderKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-4"
          >
            {searchedResults?.length > 0 &&
              !isSearching &&
              searchedResults?.map((v, i) => (
                <div key={i} className="flex flex-col gap-y-2">
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="text-neutral-400 text-sm mx-2">
                      {v?.title?.length < 20
                        ? v?.title
                        : `${v?.title.slice(0, 20)}...`}
                    </div>

                    <Popover>
                      <PopoverTrigger>
                        <IoMenu className="text-gray-500 text-md" />
                      </PopoverTrigger>
                      <PopoverContent className="bg-[#000D18] flex flex-col gap-y-2 border-none">
                        {v?.asset_status !== "PUBLISHED" &&
                          pathname === "/dashboard/private" && (
                            <EditClipOptionsModal
                              v={v}
                              clip_url={v?.location}
                              fetchFreshNewVideos={fetchFreshNewVideos}
                              selectedFilter={selectedFilter}
                              videos={videos}
                              setVideos={setVideos}
                              filteredVideos={filteredVideos}
                              setFilteredVideos={setFilteredVideos}
                              videoRenderKey={videoRenderKey}
                              setVideoRenderKey={setVideoRenderKey}
                              popoverOpen={popoverOpen}
                              setPopoverOpen={setPopoverOpen}
                            />
                          )}
                        <button
                          onClick={() =>
                            handleDownload(v?.location, v?.filename)
                          }
                          className="grow mt-2 bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20 hover:border-white/30 py-2 px-3 rounded flex items-center justify-start gap-x-2 transition-all duration-200 text-sm"
                        >
                          <IoMdCloudDownload className="" />
                          <span className="">Download</span>
                        </button>

                        {v?.asset_status !== "PUBLISHED" && (
                          <PublishClipModal
                            asset_url={v?.location}
                            draftThumnail={v?.thumbnail}
                            className="justify-start"
                          />
                        )}

                        <button
                          disabled={isDeleting}
                          onClick={() =>
                            handleDelete(v?.location, v, fetchFreshVideos)
                          }
                          className="mt-2 bg-[#9e3333]/50 !text-white py-2 md:py-2 px-3 rounded hover:bg-[#802e2e] flex items-center justify-start gap-x-2 border-none text-sm"
                        >
                          <MdDelete />
                          Delete Clip
                        </button>
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/* <Video className="h-[300px] rounded-3xl">
                                        <source src={`${v?.location}`} type='video/mp4' />
                                    </Video> */}

                  <VideoCard v={v} />
                  {pathname === "/dashboard/ready-to-post" &&
                  asset_status === "DRAFT" && (
                    <PostOnSocialContainerModal clip={v} />
                  )}
                </div>
              ))}
          </div>
        </div>

        <div
          key={videoRenderKey}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-4"
        >
          {videos?.length > 0 &&
            filteredVideos?.length === 0 &&
            !isSearching &&
            !isSearched &&
            videos?.map((v, i) => (
              <div key={i} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <div className="text-neutral-400 text-sm mx-2">
                    {v?.title?.length < 20
                      ? v?.title
                      : `${v?.title.slice(0, 20)}...`}
                  </div>

                  <Popover>
                    <PopoverTrigger>
                      <IoMenu className="text-gray-500 text-md" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-[#000D18] flex flex-col gap-y-2 border-none">
                      {v?.asset_status !== "PUBLISHED" &&
                        pathname === "/dashboard/private" && (
                          <EditClipOptionsModal
                            v={v}
                            clip_url={v?.location}
                            fetchFreshNewVideos={fetchFreshNewVideos}
                            selectedFilter={selectedFilter}
                            videos={videos}
                            setVideos={setVideos}
                            filteredVideos={filteredVideos}
                            setFilteredVideos={setFilteredVideos}
                            videoRenderKey={videoRenderKey}
                            setVideoRenderKey={setVideoRenderKey}
                            popoverOpen={popoverOpen}
                            setPopoverOpen={setPopoverOpen}
                          />
                        )}

                      <button
                        onClick={() => handleDownload(v?.location, v?.filename)}
                        className="grow mt-2 bg-white/10 text-white hover:text-white hover:bg-white/20 py-2 px-3 rounded flex items-center justify-start gap-x-2 transition-all duration-200 text-sm !border-0"
                      >
                        <IoMdCloudDownload className="" />
                        <span className="">Download</span>
                      </button>

                      {v?.asset_status !== "PUBLISHED" && (
                        <PublishClipModal
                          asset_url={v?.location}
                          draftThumnail={v?.thumbnail}
                          className="justify-start"
                        />
                      )}

                      <button
                        disabled={isDeleting}
                        onClick={() =>
                          handleDelete(v?.location, v, fetchFreshVideos)
                        }
                        className="mt-2 bg-[#9e3333]/50 !text-white py-2 md:py-2 px-3 rounded hover:bg-[#802e2e] flex items-center justify-start gap-x-2 border-none text-sm"
                      >
                        <MdDelete />
                        Delete Clip
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <Video className="h-[300px] rounded-3xl">
                                        <source src={`${v?.location}`} type='video/mp4' />
                                    </Video> */}

                <VideoCard v={v} />

                {pathname === "/dashboard/ready-to-post" &&
                  asset_status === "DRAFT" && (
                    <PostOnSocialContainerModal clip={v} />
                  )}
              </div>
            ))}

          {(isLoading || isFiltering) &&
            Array.from(new Array(12))?.map((item, index) => (
              <div key={index} className="flex flex-col gap-y-4">
                <Skeleton
                  className={`h-[400px] bg-gray-500/40 flex items-center justify-center rounded-2xl`}
                >
                  <Skeleton
                    className={"bg-gray-400/40 w-[50px] h-[50px] rounded-lg"}
                  />
                </Skeleton>
              </div>
            ))}
        </div>

        <div
          key={videoRenderKey}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-4 mb-10"
        >
          {filteredVideos?.length > 0 &&
            !isFiltering &&
            !isSearching &&
            !isSearched &&
            filteredVideos?.map((v, i) => (
              <div key={i} className="flex flex-col gap-y-2">
                <div className="flex items-center justify-between gap-x-2">
                  <div className="text-neutral-400 text-sm mx-2">
                    {v?.title?.length < 20
                      ? v?.title
                      : `${v?.title.slice(0, 20)}...`}
                  </div>

                  <Popover>
                    <PopoverTrigger>
                      <IoMenu className="text-gray-500 text-md" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-[#000D18] flex flex-col gap-y-2 border-none">
                      {v?.asset_status !== "PUBLISHED" && (
                        <EditClipOptionsModal
                          v={v}
                          clip_url={v?.location}
                          fetchFreshNewVideos={fetchFreshNewVideos}
                          selectedFilter={selectedFilter}
                          videos={videos}
                          setVideos={setVideos}
                          filteredVideos={filteredVideos}
                          setFilteredVideos={setFilteredVideos}
                          videoRenderKey={videoRenderKey}
                          setVideoRenderKey={setVideoRenderKey}
                          popoverOpen={popoverOpen}
                          setPopoverOpen={setPopoverOpen}
                        />
                      )}

                      <button
                        onClick={() => handleDownload(v?.location, v?.filename)}
                        className="grow mt-2 bg-white/10 text-white hover:text-white hover:bg-white/20 py-2 px-3 rounded flex items-center justify-start gap-x-2 transition-all duration-200 text-sm !border-0"
                      >
                        <IoMdCloudDownload className="" />
                        <span className="">Download</span>
                      </button>

                      {/* {v?.asset_status !== "PUBLISHED" && (
                        <WriteCaptionModal
                          clip={v}
                          clips={filteredVideos}
                          setClips={setFilteredVideos}
                        />
                      )} */}

                      {/* {v?.asset_status !== "PUBLISHED" && (
                        <CreateVoiceOverModal
                          clip={v}
                          clips={videos}
                          setClips={setVideos}
                          clip_url={v?.location}
                          fetchFreshNewVideos={fetchFreshNewVideos}
                          selectedFilter={selectedFilter}
                          videos={videos}
                          setVideos={setVideos}
                          filteredVideos={filteredVideos}
                          setFilteredVideos={setFilteredVideos}
                          videoRenderKeyContainer={videoRenderKey}
                          setVideoRenderKeyContainer={setVideoRenderKey}
                          popoverOpen={popoverOpen}
                          setPopoverOpen={setPopoverOpen}
                        />
                      )} */}

                      {/* {v?.asset_status !== "PUBLISHED" && (
                        <EditLengthModal
                          clip={v}
                          clips={filteredVideos}
                          setClips={setFilteredVideos}
                        />
                      )} */}

                      {v?.asset_status !== "PUBLISHED" && (
                        <PublishClipModal
                          asset_url={v?.location}
                          className="justify-start"
                          draftThumnail={v?.thumbnail}
                        />
                      )}

                      <button
                        disabled={isDeleting}
                        onClick={() =>
                          handleDelete(v?.location, v, fetchFreshVideos)
                        }
                        className="mt-2 bg-[#9e3333]/50 !text-white py-2 md:py-2 px-3 rounded hover:bg-[#802e2e] flex items-center justify-start gap-x-2 border-none text-sm"
                      >
                        <MdDelete />
                        Delete Clip
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <Video className="h-[300px] rounded-3xl">
                                        <source src={`${v?.location}`} type='video/mp4' />
                                    </Video> */}

                <VideoCard v={v} />

                {pathname === "/dashboard/ready-to-post" &&
                  asset_status === "DRAFT" && (
                    <PostOnSocialContainerModal clip={v} />
                  )}
              </div>
            ))}

          {isFiltering &&
            Array.from(new Array(12))?.map((item, index) => (
              <div key={index} className="flex flex-col gap-y-4">
                <Skeleton
                  className={`h-[300px] bg-gray-500/40 flex items-center justify-center`}
                >
                  <Skeleton
                    className={"bg-gray-400/40 w-[50px] h-[50px] rounded-lg"}
                  />
                </Skeleton>
                {/* <Skeleton className={'bg-gray-500 w-full h-[40px] py-2'} /> */}
              </div>
            ))}
        </div>

        {!isLoading &&
          videos?.length < totalVideos &&
          currentVideos?.length === 0 &&
          !isSearched && (
            <div className="pt-6 pb-2 flex items-center justify-center">
              <button
                onClick={() => fetchVideos()}
                className="bg-[#36339E]/90 bg-blend-luminosity text-white text-sm px-4 py-2 rounded-lg"
              >
                Show More
              </button>
            </div>
          )}

        {!isFiltering &&
          filteredVideos?.length < totalVideosFiltering &&
          currentVideos?.length === 0 &&
          !isSearched && (
            <div className="pt-6 pb-2 flex items-center justify-center">
              <button
                onClick={() => filteringLoadMoreFunction(selectedFilter)}
                className="bg-[#36339E]/90 bg-blend-luminosity text-white text-sm px-4 py-2 rounded-lg"
              >
                Show More
              </button>
            </div>
          )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-4 mt-6 mb-6"></div>
        )}

        {isDeleting && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500/0 w-full h-[70vh] z-50">
            <div className="w-[90%] md:w-[50%] h-[250px] bg-black/10 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center gap-y-2">
              <ImSpinner3 className="animate-spin text-3xl text-white" />
              <p className=" text-white">Deleting Clip</p>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default VideosContainer;
