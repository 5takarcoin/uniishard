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
import { useState } from "react";
// import axios from "axios";

export function SignUpCard({
  sw,
}: {
  sw: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = async () => {
    // const baseUrl = import.meta.env.VITE_BASE_URL;
    // const got = await axios.post(`${baseUrl}/auth/signup`, {
    //   username,
    //   password,
    //   name,
    // });
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
          <Button
            onClick={() => sw(true)}
            className="-ml-2 text-gray-200"
            variant={"link"}
          >
            Log in
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
