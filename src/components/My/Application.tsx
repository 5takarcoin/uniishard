import Calendar from "./Calendar";
import Navbar from "./Navbar";
import { useState } from "react";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider } from "../ui/sidebar";
import Upcomings from "./Upcomings";

export default function Application() {
  const [ind, setInd] = useState(-1);

  return (
    <SidebarProvider>
      <div className="w-full flex flex-col min-h-screen">
        <Navbar />
        <div className="flex w-full gap-8 h-full ">
          <div className="basis-1/5">
            <AppSidebar i={ind} setInd={setInd} />
          </div>
          {ind < 0 ? (
            <div className="mt-12">
              <Upcomings />
            </div>
          ) : (
            <div className="basis-4/5 mt-8 flex flex-col gap-12 flex-grow items-start justify-start">
              <Calendar ind={ind} />
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
