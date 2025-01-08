// import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";
// import { Button } from "./components/ui/button";
import { SignUpCard } from "./components/My/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Button } from "./components/ui/button";
import { logout } from "./store/userSlice";
import { Route, Routes } from "react-router-dom";

function App() {
  const user = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className="bg-gray-900 h-screen ">
      {user.name && (
        <>
          <h1>Welcom {user.name}</h1>

          <Button onClick={() => dispatch(logout())}>Logout</Button>
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
          <LoginSignout />
        </div>
      )}
    </div>
  );
}

export function LoginSignout() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginCard />}></Route>
        <Route path="/signup" element={<SignUpCard />}></Route>
      </Routes>
    </>
  );
}

export default App;
