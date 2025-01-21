import { useLogoutMutation } from "@/store/services/authApi";
import { Button } from "../ui/button";
import { useProfileQuery } from "@/store/services/dataApi";
import { Hourglass } from "lucide-react";

export default function Navbar() {
  const { data, refetch } = useProfileQuery(undefined);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout(undefined);
    refetch();
  };
  return (
    <div className="flex gap-8 h-24 items-center justify-end">
      <p className="border-2 border-blue-500 p-4">{data?.user?.name}</p>
      <Button className="" onClick={handleLogout}>
        {isLoading ? <Hourglass /> : "Log out"}
      </Button>
    </div>
  );
}
