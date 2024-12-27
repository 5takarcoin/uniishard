import { useState } from "react";
import { SlotsContext } from "./context/slotscontext";
import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";

function App() {
  const [slots, setSlots] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>(["CSE111", "CSE222"]);

  const storage = { slots, setSlots, tasks, setTasks };

  return (
    <div className="bg-gray-900 h-screen ">
      <div className="hidden">
        <SlotsContext.Provider value={storage}>
          <Home />
          <Calendar />
        </SlotsContext.Provider>
      </div>
      <div className="flex items-center justify-center h-full">
        <LoginCard />
      </div>
    </div>
  );
}

export default App;
