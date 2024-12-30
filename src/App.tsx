import { useState } from "react";
import { SlotsContext } from "./context/slotscontext";
// import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";
import { Button } from "./components/ui/button";
import { UserContext, userType } from "./context/usercontext";
import { SignUpCard } from "./components/My/SignUp";

export interface tableType {
  name: string;
  start: number;
  end: number;
  duration: number;
  interval: number;
}

function formatHHMM(date1: Date) {
  const milliseconds = Number(date1);
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 100 + minutes;
}

const tableData: tableType = {
  name: "Bracu",
  start: formatHHMM(new Date()),
  end: formatHHMM(new Date()) + 6 * 60 * 60 * 1000,
  duration: 80,
  interval: 10,
};

function App() {
  const [slots, setSlots] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>(["CSE111", "CSE222"]);

  const [user, setUser] = useState<userType>({} as userType);
  const tables: tableType[] = [
    tableData,
    { ...tableData, name: "nsu" },
    { ...tableData, name: "aiub" },
  ];
  const storage = { slots, setSlots, tasks, setTasks };

  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, tables }}>
      <SlotsContext.Provider value={storage}>
        <div className="bg-gray-900 h-screen ">
          {user.name && (
            <>
              <h1>Welcom {user.name}</h1>
              <Button onClick={() => setUser({} as userType)}>Logout</Button>
            </>
          )}
          {user.name ? (
            <div className="">
              {/* <Home /> */}
              <Calendar tableData={user?.currTable ?? undefined} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <LoginCard />
              <SignUpCard />
            </div>
          )}
        </div>
      </SlotsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
