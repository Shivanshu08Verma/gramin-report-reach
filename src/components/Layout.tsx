import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";
import { NotificationBar } from "./NotificationBar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <NotificationBar />
      <main className="pt-10 pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};