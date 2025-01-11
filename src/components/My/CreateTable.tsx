import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, Plus, RefreshCcw, X } from "lucide-react";
import { useState } from "react";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { SlotsContext } from "@/context/slotscontext";
import { tableStyleType } from "@/utils/types";
import CalCal from "./CalCal";
import NewSchema from "./NewSchema";
import {
  useAllStylesQuery,
  useNewStyleMutation,
  useNewTableMutation,
  useProfileQuery,
  useUpdateCurrTableMutation,
} from "@/store/services/dataApi";
import SelectExistingTable from "./SelectExistingTable";

// const handleSetUserCurrTable = async (
//   sU: React.Dispatch<React.SetStateAction<userType>>,
//   un: string,
//   tab: string
// ) => {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const us = await axios.put(`${baseUrl}/user/${un}`, {
//     currTable: tab,
//   });
//   console.log(us.data);
//   sU(us.data);
// };

// const existingSetTable = async (shape: tableStyleType, user: string) => {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   // const got = await axios.get(`${baseUrl}/tableStyle/:${shape._id}`);
//   if (shape.name) {
//     const tab = await axios.post(`${baseUrl}/table`, {
//       slots: [],
//       owner: user,
//       schema: shape._id,
//     });
//     // console.log("muhhahaha" + got.data);
//     return tab.data;
//   }
// };

// const updateCurrTable = async (un: string, id: string) => {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const tab = await axios.get(`${baseUrl}tableStyle/${id}`);
//   await axios.put(`${baseUrl}user/${un}`, {
//     currTable: tab.data._id,
//   });
//   return tab.data;
// };

export function CreateTable({ change = false }: { change?: boolean }) {
  const [existing, setExisting] = useState(true);
  const [currentTable, setCurrentTable] = useState<tableStyleType | null>(null);

  const [shape, setShape] = useState<tableStyleType>({} as tableStyleType);

  const { data: tables, refetch } = useAllStylesQuery(undefined);
  const { data: user, refetch: refetchUser } = useProfileQuery(undefined);

  const [newStyle] = useNewStyleMutation();
  const [newTable] = useNewTableMutation();
  const [upCT] = useUpdateCurrTableMutation();

  const addSetTable = async (shape: tableStyleType, user: string) => {
    const got = await newStyle(shape);
    const tab = await newTable({
      slots: [],
      owner: user,
      schema: got.data._id,
    });
    console.log(tab.data);
    return tab.data;
  };

  const updateCurrTable = async (un: string, id: string) => {
    await upCT({ body: { currTable: id }, id: un });
    refetchUser();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-8" variant="outline">
          {!change ? "Create" : "Change"} Table <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        //  className="w-[425px]"
        className="w-[900px] max-w-none h-[500px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Table Shape</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex  w-ful overflow-x-auto">
          <div className="">
            {!existing ? (
              <NewSchema setShape={setShape} />
            ) : (
              <div className="m-auto mb-8">
                <Button
                  onClick={() => setExisting(false)}
                  className="p-8 text-sm"
                  variant="outline"
                >
                  Create New Shape <Plus />
                </Button>
              </div>
            )}
            {existing && (
              <>
                <div className="h-[1rem] flex items-center justify-between">
                  <div className="h-[1px] bg-gray-500/50 flex-1"></div>
                  <Label className="h-[1rem px-2">Or</Label>
                  <div className="h-[1px] bg-gray-500/50 flex-1"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-md"> Select Existing</Label>
                  <Button
                    onClick={refetch}
                    className="text-md mt-1 px-3 rounded-full"
                    variant={"ghost"}
                  >
                    <RefreshCcw />
                  </Button>
                  <Button
                    onClick={() => setCurrentTable({} as tableStyleType)}
                    className="text-md mt-1 px-3 rounded-full"
                    variant={"ghost"}
                  >
                    <X />
                  </Button>
                </div>
                <div className="">
                  <SelectExistingTable
                    currentTable={currentTable}
                    setCurrentTable={setCurrentTable}
                    tables={tables}
                  />
                </div>
                <div></div>
              </>
            )}
          </div>
          <div className="w-[1px] bg-gray-500/30 mt-4 mx-4" />
          <div className="">
            {/* Cursor */}
            {existing && currentTable?.name && (
              <CalCal currTable={currentTable!} />
            )}
            {!existing && shape?.name && <CalCal currTable={shape!} />}
            {((existing && !currentTable?.name) ||
              (!existing && !shape?.name)) && (
              <div className="flex  items-center justify-center">
                <DialogDescription className="text-center">
                  <span className="">
                    Select a Table <br />
                    or <br />
                    Create a new one
                  </span>
                </DialogDescription>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row-reverse direction-reverse justify-between w-full">
            <DialogClose asChild>
              <Button
                onClick={async () => {
                  if (!existing) {
                    const tab = await addSetTable(shape, user.user._id);
                    await updateCurrTable(user.user.username, tab._id);
                  }
                  // else {
                  //   await updateCurrTable(user.username, currentTable!.name);
                  //   const tab = await existingSetTable(currentTable!, user._id);
                  //   // await handleSetUserCurrTable(
                  //   //   setUser!,
                  //   //   user.username,
                  //   //   tab._id
                  //   // );
                  // }
                }}
                type="button"
                variant="default"
              >
                Save
              </Button>
            </DialogClose>
            {!existing && (
              <Button
                onClick={() => setExisting(true)}
                type="button"
                variant="outline"
              >
                <span className="-ml-2">
                  <ChevronLeft />
                </span>{" "}
                Select Existing
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
