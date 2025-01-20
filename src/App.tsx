// import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";
// import { Button } from "./components/ui/button";
import { SignUpCard } from "./components/My/SignUp";
// import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useProfileQuery } from "./store/services/dataApi";
import { reshapeSlots } from "./utils/utils";
import Home from "./components/My/Home";
import { Hourglass } from "lucide-react";
import Navbar from "./components/My/Navbar";

function App() {
  const { data, isFetching } = useProfileQuery(undefined);
  console.log(data);
  const slots = data?.user?.tables[0]?.slots;
  console.log(slots);
  console.log(reshapeSlots(slots));

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            isFetching ? (
              <Hourglass />
            ) : data?.user?.username ? (
              <div className="w-full flex flex-col min-h-screen">
                <Navbar />
                <div className="flex flex-grow items-center justify-center">
                  <Calendar />
                </div>
              </div>
            ) : (
              <Home />
            )
          }
        />
        <Route path="/login" element={<LoginCard />}></Route>
        <Route path="/signup" element={<SignUpCard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
