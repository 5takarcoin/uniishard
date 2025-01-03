import { useEffect, useState } from "react";
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

function App() {
  const [slots, setSlots] = useState<string[]>([]);
  const [currTable, setCurrTable] = useState<tableType>({} as tableType);
  const [tasks, setTasks] = useState<string[]>(["CSE111", "CSE222"]);

  const [isloginpage, setIsloginpage] = useState(false);

  const [user, setUser] = useState<userType>({} as userType);

  const storage = { slots, setSlots, tasks, setTasks, currTable, setCurrTable };

  // const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setCurrTable(user.currTable || ({} as tableType));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
              {/* <Calendar tableData={user?.currTable ?? undefined} /> */}
              <Calendar />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              {isloginpage ? (
                <LoginCard sw={setIsloginpage} />
              ) : (
                <SignUpCard sw={setIsloginpage} />
              )}
            </div>
          )}
        </div>
      </SlotsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
