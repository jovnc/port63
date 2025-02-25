import { auth } from "@/auth";
import CreateConcertButton from "@/components/concert/CreateConcertButton";
import UpcomingConcerts from "@/components/dashboard/UpcomingConcerts";
import { UserStats } from "@/components/dashboard/UserStats";
import NotFound from "../not-found";
import { getUserBalance } from "@/actions/user";
import { getUserTickets } from "@/actions/ticket";

export default async function Dashboard() {
  const user = await auth();

  if (!user) {
    return <NotFound />;
  }

  const userId = user.user?.id as string;
  const balance = await getUserBalance(userId);

  const tickets = await getUserTickets({ userId });

  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between mt-16">
        <h1 className="text-center text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="w-full gap-4 flex flex-col">
        <UserStats balance={balance} userId={userId} tickets={tickets} />
        <div className="flex items-end justify-end">
          <CreateConcertButton />
        </div>
        <UpcomingConcerts />
      </div>
    </div>
  );
}
