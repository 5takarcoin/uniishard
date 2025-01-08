import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/services/myApi";
import { useDispatch } from "react-redux";
import { setCreds } from "@/store/userSlice";
import { useState } from "react";

export function LoginCard({
  sw,
}: {
  sw: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const handleClick = async () => {
    // const baseUrl = import.meta.env.VITE_BASE_URL;
    // const got = await axios.post(`${baseUrl}/auth/login`, {
    //   username,
    //   password,
    // });
    try {
      const response = await login({ username, password });

      dispatch(setCreds(response.data));
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
      <CardFooter className="flex flex-col justify-between">
        <Button onClick={handleClick} className="w-full">
          Log in
        </Button>
        <p className="pt-4 text-gray-400">
          Don't have an account?
          <Button
            onClick={() => sw(false)}
            className="-ml-2 text-gray-200"
            variant={"link"}
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
