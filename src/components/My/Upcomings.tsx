import { useProfileQuery } from "@/store/services/dataApi";

export default function Upcomings() {
  const { data } = useProfileQuery(undefined);
  console.log(data);

  return <div>Upcomings</div>;
}
