import { useLogoutMutation } from "@/store/services/authApi";
import { Button } from "../ui/button";
import { useProfileQuery } from "@/store/services/dataApi";
import { Hourglass, MenuIcon } from "lucide-react";
import logo from "/logo.svg";

export default function Navbar({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data, refetch } = useProfileQuery(undefined);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout(undefined);
    refetch();
  };
  return (
    <div className="flex gap-8 h-24 items-center justify-between px-8 bg-background border-b">
      <div className="hidden md:block">
        {/* <h1 className="text-3xl font-bold tracking-widest">Meow</h1> */}
        <img src={logo} alt="Logo" className="h-28 px-8 py-6" />
      </div>
      <div>
        <Button onClick={() => setToggle((t) => !t)} className="md:hidden">
          <MenuIcon />
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <p className="border rounded-3xl px-8 h-12 flex items-center border-blue-500 p-4">
          {data?.user?.name}
        </p>
        <Button className="" onClick={handleLogout}>
          {isLoading ? <Hourglass /> : "Log out"}
        </Button>
      </div>
    </div>
  );
}
