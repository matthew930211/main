"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { checkSubscription } from "@/lib/actions/checkSubscription";
import { useUser } from "@clerk/nextjs";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayoutContainer = ({ children, isPro }) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isPro && pathname === "/dashboard/generate") {
      router.push("/dashboard/settings/subscription");
    }
  }, [pathname]);

  return (
    <div>
      {state === "collapsed" && <SidebarTrigger className="hidden md:flex" />}
      {isMobile && <SidebarTrigger />}
      {pathname === "/dashboard/generate" && isPro && children}
      {pathname !== "/dashboard/generate" && children}
    </div>
  );
};

export default DashboardLayoutContainer;
