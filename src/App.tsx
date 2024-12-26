import { useState } from "react";
import { SlotsContext } from "./context/slotscontext";
import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";

function App() {
  const [slots, setSlots] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>(["CSE111", "CSE222"]);

  const storage = { slots, setSlots, tasks, setTasks };

  return (
    <div className="bg-gray-900">
      <SlotsContext.Provider value={storage}>
        <Home />
        <Calendar />
      </SlotsContext.Provider>
    </div>
  );
}

export default App;
