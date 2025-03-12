"use server"

import axios from "axios";
import { redirect } from "next/navigation";

export const checkUserQuota = async (isPro, userId, quota_type, count) => {
    if (!userId) {
        return false;
    }
    console.log({ isPro, userId, quota_type, count })
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NODE_API_URL}/assets/check-user-quota`,
        {
            isPro, userId, quota_type, count
        }
    );

    const data = response?.data;

    console.log("check user quota", data);

    const hasQuota = data?.hasQuota;

    if (hasQuota) {
        return hasQuota
    }

    if (isPro && !hasQuota) {
        redirect("/dashboard/settings/quota-exceed")
    } else {
        redirect("/dashboard/settings/subscription")
    }


};
