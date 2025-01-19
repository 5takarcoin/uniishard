import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupMutation } from "@/store/services/authApi";
import { useProfileQuery } from "@/store/services/dataApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUpCard() {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const { refetch } = useProfileQuery(undefined);

  const handleClick = async () => {
    try {
      const response = await signup({ name, username, password });
      setMessage(response.data.message);
      if (response.data.message === "Signup Successful") {
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
        <CardTitle className="text-center  text-xl">Sign up</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p>{message}</p>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button onClick={handleClick} className="w-full">
          Sign up
        </Button>
        <p className="pt-4 text-gray-400">
          Already have an account?
          <Button className="-ml-2 text-gray-200" variant={"link"}>
            <Link to={"/login"}>Log in</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
