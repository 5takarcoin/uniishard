import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import { dateInNumber, removeIthElement } from "@/utils/utils";
import { UserContext } from "@/context/usercontext";
import { slotType, userType } from "@/utils/types";
import axios from "axios";
import { SlotsContext } from "@/context/slotscontext";

// function DropdownMenuDemo({
//   addedTask,
//   setAddedTask,
// }: {
//   addedTask: taskType;
//   setAddedTask: React.Dispatch<React.SetStateAction<taskType>>;
// }) {
//   const { tasks } = useContext(SlotsContext);
//   const [selectVal, setSelectVal] = useState<number>(Date.now());
//   return (
//     <Select
//       key={selectVal}
//       onValueChange={(value) => {
//         setSelectVal(Date.now());
//         setAddedTask({ ...addedTask, infos: [...addedTask.infos, value] });
//       }}
//     >
//       <SelectTrigger id="popup-select-trigger" className="w-32">
//         <SelectValue placeholder="Select" />
//       </SelectTrigger>
//       {tasks.filter((task: string) => addedTask.infos.includes(task) === false)
//         .length > 0 && (
//         <SelectContent position="popper">
//           {tasks
//             .filter((task: string) => addedTask.infos.includes(task) === false)
//             .map((task: string, i: number) => (
//               <SelectItem key={i} value={task}>
//                 {task}
//               </SelectItem>
//             ))}
//         </SelectContent>
//       )}
//     </Select>
//   );
// }

export function SlotInput({
  date,
  slot,
  s,
}: {
  date: Date;
  slot: number;
  s: string;
}) {
  return <p>nothing</p>;
}

// export function SlotInput({
//   date,
//   slot,
//   s,
// }: {
//   date: Date;
//   slot: number;
//   s: string;
// }) {
//   const [title, setTitle] = useState("");
//   const [inp, setInp] = useState("");
//   const [infos, setInfos] = useState<string[]>([]);
//   //   const [desc, setDesc] = useState("");
//   const { user, setUser } = useContext(UserContext);
//   const { slotsAha } = useContext(SlotsContext);

//   const dateStr = `${dateInNumber(date)}${slot}`;
//   const data = { date: dateStr, ...slotsAha[dateStr] };

//   setTitle(data.title);
//   setInfos(data.infos);

//   const [addedTask, setAddedTask] = useState<slotType>({} as slotType);

//   // useEffect(() => {
//   //   const d = user.currTable?.slots.filter((slot) => slot.date === dateStr);
//   //   if (d) setAddedTask(d[0]);
//   // }, [dateStr, user.currTable?.slots]);

//   useEffect(() => {
//     setAddedTask({
//       date: dateStr,
//       title,
//       infos,
//     });
//   }, [infos, title, dateStr]);

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="h-full w-full" variant="ghost">
//           {dateInNumber(date)}
//           {slot}
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add Task</DialogTitle>
//           <DialogDescription>
//             {s}
//             {" - "}
//             {date.toLocaleDateString("en-GB")}
//           </DialogDescription>
//         </DialogHeader>
//         <DialogDescription className="flex gap-2"></DialogDescription>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Title
//             </Label>
//             <Input
//               id="name"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="col-span-3"
//             />
//             <div className="flex flex-colw-72">
//               {infos.map((task: string, i: number) => (
//                 <span
//                   className="flex items-center gap-2 border rounded-full py-2 pl-4 pr-2 text-xs justify-between"
//                   key={i}
//                 >
//                   <span key={i}>{task}</span>
//                   <button onClick={() => setInfos(removeIthElement(infos, i))}>
//                     <X className="h-4" />
//                   </button>
//                 </span>
//               ))}

//               <div className="flex">
//                 <Input
//                   id="inp"
//                   value={inp}
//                   onChange={(e) => setInp(e.target.value)}
//                   className="w-36 "
//                 />
//                 <Button
//                   onClick={() => {
//                     if (inp !== "") {
//                       setInfos([...infos, inp]);
//                       setInp("");
//                     }
//                   }}
//                 >
//                   <Plus />
//                 </Button>
//               </div>
//             </div>
//             {/* <DropdownMenuDemo
//               addedTask={addedTask}
//               setAddedTask={setAddedTask}
//             /> */}
//           </div>
//         </div>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button
//               onClick={() => handleSlotPost(addedTask, user, setUser!)}
//               type="button"
//               variant="default"
//             >
//               Save
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// async function handleSlotPost(
//   addedTask: slotType,
//   user: userType,
//   setUser: React.Dispatch<React.SetStateAction<userType>>
// ) {
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   await axios.put(`${baseUrl}/table/${user.currTable?._id}`, addedTask);
//   console.log(user);
//   const get = await axios.get(`${baseUrl}/user/${user.username}`);
//   setUser(get.data);
// }
