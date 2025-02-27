import { getAllUserTickets } from "@/actions/ticket";
import { auth } from "@/auth";
import React from "react";
import NotFound from "../not-found";
import TicketView from "@/components/ticket/TicketView";

export default async function page() {
  const user = await auth();
  const userId = user?.user?.id;

  if (!userId) {
    return <NotFound />;
  }

  const tickets = await getAllUserTickets({ userId: userId as string });

  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between mt-16">
        <h1 className="text-center text-3xl font-bold">My Tickets</h1>
        {tickets.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-20">
            You have no tickets yet.
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketView ticket={ticket} key={ticket.id} userId={userId} />
        ))}
      </div>
    </div>
  );
}
