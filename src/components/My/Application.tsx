import Calendar from "./Calendar";
import Navbar from "./Navbar";
import { useState } from "react";
import { AppSidebar } from "./Sidebar";
import { SidebarProvider } from "../ui/sidebar";
import Upcomings from "./Upcomings";
import { useProfileQuery } from "@/store/services/dataApi";

export default function Application() {
  const [ind, setInd] = useState(-1);
  const [toggle, setToggle] = useState(true);

  const { data } = useProfileQuery(undefined);
  const l: number = data?.user?.tables?.length || 0;
  const a = Array.from({ length: l }, () => 1);
  const [arr, setArr] = useState(a);

  return (
    <SidebarProvider>
      <div className="w-full flex flex-col min-h-screen ">
        <Navbar setToggle={setToggle} />
        <div className="flex h-full relative">
          <div
            className={`${
              toggle ? "-translate-x-full duration-200" : ""
            } md:static z-[40] md:translate-x-0 h-full absolute top-0  transition-all md:block md:w-4/12 lg:w-1/4 xl:w-1/5`}
          >
            <AppSidebar
              arr={arr}
              setArr={setArr}
              setToggle={setToggle}
              i={ind}
              setInd={setInd}
            />
          </div>
          <div className=" w-full  md:w-8/12 lg:w-3/4 xl:w-4/5">
            {!toggle && (
              <div
                onClick={() => {
                  setToggle(true);
                }}
                className="md:hidden z-[100] bg-black/60 h-full w-full absolute"
              ></div>
            )}
            <div className="h-full max-w-full p-8">
              {ind < 0 ? (
                <Upcomings ar={arr} />
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
