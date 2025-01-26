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
      <div className="w-full flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex h-full ">
          <div className="w-0 md:w-4/12 lg:w-1/4 xl:w-1/5 ">
            <AppSidebar i={ind} setInd={setInd} />
          </div>
          <div className=" w-full  md:w-8/12 lg:w-3/4 xl:w-4/5">
            <div className="h-full max-w-full p-8">
              {ind < 0 ? (
                <Upcomings />
              ) : (
                // <div className=" border-[32px]  bg-blue-600 flex flex-col gap-12 flex-grow items-start justify-start h-full">
                <Calendar ind={ind} />
                // </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
