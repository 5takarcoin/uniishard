import Calendar from "./Calendar";
import Navbar from "./Navbar";
import { useState } from "react";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider } from "../ui/sidebar";

export default function Application() {
  const [ind, setInd] = useState(0);

  return (
    <SidebarProvider>
      <div className="w-full flex flex-col min-h-screen">
        <Navbar />
        <div className="flex w-full gap-12 h-full">
          <div className="basis-1/5 bg-blue-300">
            <AppSidebar i={ind} setInd={setInd} />
          </div>
          <div className="basis-4/5 flex flex-col gap-12 flex-grow items-start justify-start">
            <Calendar ind={ind} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
