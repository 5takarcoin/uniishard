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
import { useState } from "react";
import axios from "axios";

export function LoginCard() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const reqBody = {
    date: Number(new Date()),
    title: "from front",
    infos: ["eta", "ota"],
  };

  const handleClick = async () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const got = await axios.post(`${baseUrl}/slots`, {
      ...reqBody,
      title: username,
      infos: [password],
    });
    console.log(got.data);
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center  text-xl">Log In</CardTitle>
        <CardDescription>
          {username}
          {"  _  "}
          {password}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleClick} className="w-full">
          Log in
        </Button>
      </CardFooter>
    </Card>
  );
}
