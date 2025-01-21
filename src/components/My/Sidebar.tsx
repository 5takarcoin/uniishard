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
import { useState } from "react";
import { useProfileQuery } from "@/store/services/dataApi";
import { ArrowRightIcon, Eye, EyeOff } from "lucide-react";
import { CreateTable } from "./CreateTable";

export function AppSidebar({
  i,
  setInd,
}: {
  i: number;
  setInd: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { data } = useProfileQuery(undefined);
  const l: number = data?.user?.tables?.length!;
  const a = Array.from({ length: l }, () => 1);
  const [arr, setArr] = useState(a);

  const handleToggle = (ind: number) => {
    const temp = [...arr];
    temp[ind] = arr[ind] === 1 ? 0 : 1;
    setArr(temp);
  };

  return (
    <Sidebar collapsible="none" className="border-none w-full p-4">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg pb-4">Tables</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {arr.map((item, ind) => (
                <SidebarMenuItem key={ind}>
                  <SidebarMenuButton asChild>
                    <div>
                      <Button
                        className="border h-8 w-8 rounded-full -mr-2 opacity-30"
                        onClick={() => handleToggle(ind)}
                        variant={"link"}
                      >
                        {item === 0 ? <EyeOff /> : <Eye />}
                      </Button>
                      <Button
                        onClick={() => setInd(ind)}
                        variant={"ghost"}
                        className={`${
                          ind === i ? "text-blue-400" : ""
                        } flex justify-between w-full`}
                      >
                        <span>{data?.user?.tables[ind].name} </span>
                        <span>{ind === i ? <ArrowRightIcon /> : null}</span>
                      </Button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateTable />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
