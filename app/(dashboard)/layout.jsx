import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/DashboardPage/AppSidebar/AppSidebar";
import DashboardLayoutContainer from "@/components/DashboardPage/DashboardLayoutContainer/DashboardLayoutContainer";
import { getAuth, auth } from "@clerk/nextjs/server";
import { checkSubscription } from "@/lib/actions/checkSubscription";

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();
  const isPro = await checkSubscription(userId);

  return (
    <SidebarProvider>
      <AppSidebar />
      {/*  px-10 pt-4 */}
      <main className="w-full px-4 lg:px-10 pt-4">
        <DashboardLayoutContainer children={children} isPro={isPro} />
      </main>
    </SidebarProvider>
  );
}
