import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { useProfileQuery } from "@/store/services/dataApi";
import { ArrowRightIcon, Eye, EyeOff } from "lucide-react";
import { CreateTable } from "./CreateTable";
import React from "react";

export function AppSidebar({
  i,
  setInd,
  setToggle,
  arr,
  setArr,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  i: number;
  setInd: React.Dispatch<React.SetStateAction<number>>;
  arr: number[];
  setArr: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { data } = useProfileQuery(undefined);

  const handleToggle = (ind: number) => {
    const temp = [...arr];
    temp[ind] = arr[ind] === 1 ? 0 : 1;
    setArr(temp);
  };

  return (
    <Sidebar collapsible="none" className="border-r bg-background w-full p-4">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg pb-4">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton className="py-6" asChild>
                  <div className="">
                    <Button
                      onClick={() => {
                        setInd(-1);
                        setToggle(true);
                      }}
                      variant={"ghost"}
                      className={`${
                        i === -1 ? "text-blue-400" : ""
                      } flex justify-between w-full`}
                    >
                      <span className=" -ml-1 text-base">Upcoming Tasks</span>
                      <span>{-1 === i ? <ArrowRightIcon /> : null}</span>
                    </Button>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroup>
            <SidebarGroupContent>
              <CreateTable setToggle={setToggle} />
            </SidebarGroupContent>
          </SidebarGroup>
          {/* <Collapsible> */}
          <SidebarGroupLabel className="text-lg pb-4 mt-4">
            Tables
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {arr.map((item, ind) => (
                <SidebarMenuItem key={ind}>
                  <SidebarMenuButton
                    style={{
                      color: data?.user?.tables[ind].color,
                      // color: getContrastColor(
                      //   data?.user?.tables[ind].color || "#000000"
                      // ),
                    }}
                    asChild
                    className="rounded-full"
                  >
                    <div>
                      <Button
                        className={`${
                          item === 0 && "text-muted"
                        } border h-6 max-w-4 bg-background rounded-full -ml-1`}
                        onClick={() => handleToggle(ind)}
                        variant={"link"}
                      >
                        {item === 0 ? <EyeOff /> : <Eye />}
                      </Button>
                      <Button
                        onClick={() => {
                          setInd(ind);
                          setToggle(true);
                        }}
                        variant={"ghost"}
                        className={`${
                          ind === i ? "text-blue-400" : ""
                        } flex justify-between w-full h-6 -ml-1 -mr-1 rounded-full`}
                      >
                        <span className={`${item === 0 && "opacity-30"}`}>
                          {data?.user?.tables[ind].name}
                        </span>
                        <span>{ind === i ? <ArrowRightIcon /> : null}</span>
                      </Button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          {/* </Collapsible> */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
