import { useState } from "react";
import { SlotsContext } from "./context/slotscontext";
import Home from "./components/My/Home";

function App() {
  const [slots, setSlots] = useState<string[]>([]);
  const [tasks, setTasks] = useState<string[]>(["CSE111", "CSE222"]);

  const storage = { slots, setSlots, tasks, setTasks };

  return (
    <>
      <SlotsContext.Provider value={storage}>
        {/* <Calendar /> */}
        <Home />
      </SlotsContext.Provider>
    </>
  );
}

export default App;
