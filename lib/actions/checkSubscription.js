"use server"

import axios from "axios";

export const checkSubscription = async (userId) => {
  if (!userId) {
    return false;
  }

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_NODE_API_URL}/payments/stripe/check-subscription`,
    {
      userId,
    }
  );

  console.log("data in checksubsciption", data);

  const userSubscription = data.userSubscription;

  if (!userSubscription) {
    return false;
  }
  const DAY_IN_MS = 86_400_000;
  const isValid =
    userSubscription.stripePriceId &&
    Date.parse(userSubscription.stripeCurrentPeriodEnd) + DAY_IN_MS >
    Date.now();
  console.log(
    'user sub : ', Date.parse(userSubscription.stripeCurrentPeriodEnd) + DAY_IN_MS > Date.now()
  );

  return !!isValid;
};
