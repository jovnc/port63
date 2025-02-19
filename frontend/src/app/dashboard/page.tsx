import CreateConcertButton from "@/components/concert/CreateConcertButton";
import UpcomingConcerts from "@/components/dashboard/UpcomingConcerts";
import { UserStats } from "@/components/dashboard/UserStats";

export default async function Dashboard() {
  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between">
        <h1 className="text-center text-3xl font-bold">
            Dashboard
        </h1>
      </div>
      <div className="w-full gap-4 flex flex-col">
        <UserStats />
        <div className="flex items-end justify-end">
          <CreateConcertButton />
        </div>
        <UpcomingConcerts />
      </div>
    </div>
  );
}
