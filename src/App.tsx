import { useState } from "react";
import { SlotsContext } from "./context/slotscontext";
// import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";
import { Button } from "./components/ui/button";

export interface tableType {
  start: number;
  end: number;
  slotTime: number;
  interval: number;
}

function formatHHMM(date1: Date) {
  const milliseconds = Number(date1);
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 100 + minutes;
}

function App() {
  const [slots, setSlots] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>(["CSE111", "CSE222"]);

  const storage = { slots, setSlots, tasks, setTasks };

  const [loggedIn, setLoggedIn] = useState(false);

  const tableData: tableType = {
    start: formatHHMM(new Date()),
    end: formatHHMM(new Date()) + 6 * 60 * 60 * 1000,
    slotTime: 80,
    interval: 10,
  };

  console.log(tableData);

  return (
    <div className="bg-gray-900 h-screen ">
      <Button onClick={() => setLoggedIn(!loggedIn)}>
        {!loggedIn ? "Login" : "Logout"}
      </Button>
      {loggedIn ? (
        <div className="">
          <SlotsContext.Provider value={storage}>
            {/* <Home /> */}
            <Calendar />
          </SlotsContext.Provider>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoginCard />
        </div>
      )}
    </div>
  );
}

export default App;
