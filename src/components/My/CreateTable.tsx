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
import { Label } from "@/components/ui/label";
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

export function CreateTable({ change = false }: { change?: boolean }) {
  const [existing, setExisting] = useState(true);
  const [currentTable, setCurrentTable] = useState<tableStyleType | null>(null);

  const [shape, setShape] = useState<tableStyleType>({} as tableStyleType);

  const { data: tables, refetch } = useAllStylesQuery(undefined);
  const { data: user, refetch: refetchUser } = useProfileQuery(undefined);

  const [newStyle] = useNewStyleMutation();
  const [newTable] = useNewTableMutation();
  const [upCT] = useUpdateCurrTableMutation();

  const addSetTable = async (shape: tableStyleType) => {
    const got = await newStyle(shape);
    console.log(got.data);
    return got.data;
  };

  const updateCurrTable = async (id: string) => {
    const tab = await newTable({
      slots: [],
      owner: user?.user._id,
      schema: id,
    });
    await upCT({ body: { currTable: tab.data._id }, id: user?.user.username });
    refetchUser();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-8 w-48" variant="outline">
          {!change ? "Create" : "Change"} Table <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent
        //  className="w-[425px]"
        className="w-[900px] max-w-none h-[600px]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Table Shape</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="flex w-full h-[450px]">
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
                  <Label className="h-[1rem] px-2">Or</Label>
                  <div className="h-[1px] bg-gray-500/50 flex-1"></div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Label className="text-md "> Select Existing</Label>
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
                <div className="mt-2">
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
          <div className="w-[1px] bg-gray-500/30 mx-4 mb-2" />
          <div className=" w-full ">
            {/* Cursor */}
            {existing && currentTable?.name && (
              <CalCal currTable={currentTable!} />
            )}
            {!existing && shape?.name && <CalCal currTable={shape!} />}
            {((existing && !currentTable?.name) ||
              (!existing && !shape?.name)) && (
              <div className="w-full h-full border flex items-center justify-center">
                <DialogDescription className="text-center text-lg">
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
                    const tab = await addSetTable(shape);
                    await updateCurrTable(tab._id);
                  } else {
                    await updateCurrTable(currentTable!._id!);
                  }
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
