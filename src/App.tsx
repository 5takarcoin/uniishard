import { LoginCard } from "./components/My/LogIn";
import { SignUpCard } from "./components/My/SignUp";
import { Route, Routes } from "react-router-dom";
import { useProfileQuery } from "./store/services/dataApi";
import Home from "./components/My/Home";
import { Hourglass } from "lucide-react";
import Application from "./components/My/Application";

function App() {
  const { data, isFetching } = useProfileQuery(undefined);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            isFetching ? (
              <Hourglass />
            ) : data?.user?.username ? (
              <Application />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login"
          element={
            isFetching ? (
              <Hourglass />
            ) : data?.user?.username ? (
              <Application />
            ) : (
              <LoginCard />
            )
          }
        ></Route>
        <Route
          path="/signup"
          element={
            isFetching ? (
              <Hourglass />
            ) : data?.user?.username ? (
              <Application />
            ) : (
              <SignUpCard />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
