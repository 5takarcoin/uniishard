// import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";
// import { Button } from "./components/ui/button";
import { SignUpCard } from "./components/My/SignUp";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
  const [isloginpage, setIsloginpage] = useState(false);

  const user = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-gray-900 h-screen ">
      {user.name && (
        <>
          <h1>Welcom {user.name}</h1>

          {/* <Button onClick={() => setUser({} as userType)}>Logout</Button> */}
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
  );
}

export default App;
