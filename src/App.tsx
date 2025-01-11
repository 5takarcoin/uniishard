// import Home from "./components/My/Home";
import Calendar from "./components/My/Calendar";
import { LoginCard } from "./components/My/LogIn";
// import { Button } from "./components/ui/button";
import { SignUpCard } from "./components/My/SignUp";
// import { useDispatch } from "react-redux";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import { useProfileQuery } from "./store/services/dataApi";
import { useLogoutMutation } from "./store/services/authApi";
import { reshapeSlots } from "./utils/utils";
// import {  } from "./store/services/authApi";

function App() {
  const { data } = useProfileQuery(undefined);
  console.log("u know u");
  const slots = data?.user?.currTable?.slots;
  console.log(slots);
  console.log(reshapeSlots(slots));
  // const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  // const [triggerLogout, { isFetching, isError, isSuccess }] = useLazyLogoutQuery();
  // if (user.name) dispatch(setCreds(user));

  const handleLogout = async () => {
    await logout(undefined);
  };

  return (
    <div className="bg-gray-900 h-screen ">
      <h1></h1>
      {data?.user?.username && (
        <>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
      {
        // data?.user?.username
        Number("1") == 1 ? (
          <div className="">
            {/* <Home /> */}
            {/* <Calendar tableData={user?.currTable ?? undefined} /> */}
            <h1>Noicee</h1>
            <Routes>
              <Route
                path="/"
                element={data?.user?.username ? <Calendar /> : <p>Cinina</p>}
              ></Route>
              <Route path="/login" element={<LoginCard />}></Route>
              <Route path="/signup" element={<SignUpCard />}></Route>
            </Routes>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            {/* <LoginSignout /> */}
            <p>good</p>
          </div>
        )
      }
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
