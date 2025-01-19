import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/services/authApi";
import { useProfileQuery } from "@/store/services/dataApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginCard() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { refetch } = useProfileQuery(undefined);

  const handleClick = async () => {
    try {
      setMessage("");
      const response = await login({ username, password });
      setMessage(response.data.message);
      if (response.data.message === "Login Successful") {
        refetch();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center  text-xl">Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription></CardDescription>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              {/* <Label htmlFor="name">Username</Label> */}
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              {/* <Label htmlFor="name">Username</Label> */}
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p
              className={
                message === "Login Successful"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {message}
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        <Button onClick={handleClick} className="w-full">
          Log in
        </Button>
        <p className="pt-4 text-gray-400">
          Don't have an account?
          <Button className="-ml-2 text-gray-200" variant={"link"}>
            <Link to={"/signup"}>Sign up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
