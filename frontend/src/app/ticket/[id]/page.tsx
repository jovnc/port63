import { getTicketById, userOwnTicket } from "@/actions/ticket";
import NotFound from "@/app/not-found";
import { auth } from "@/auth";
import ClaimTicketForm from "@/components/ticket/ClaimTicketForm";
import TicketCard from "@/components/ticket/TicketCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const user = await auth();
  const { id: ticketId } = await params;

  const userId = user?.user?.id as string;

  const isOwner = await userOwnTicket({
    userId,
    ticketId,
  });

  if (!isOwner) {
    return <NotFound />;
  }

  const ticket = await getTicketById({ ticketId });

  if (!ticket) {
    return <NotFound />;
  }

  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between mt-16">
        <h1 className="text-center text-3xl font-bold">Ticket Information</h1>
      </div>
      <div className="w-full gap-8 flex flex-col justify-center">
        <TicketCard ticket={ticket} />
        <p className="text-muted-foreground text-sm text-center">
          You can only claim the QR code 4 hours before the concert
        </p>
        <ClaimTicketForm />
      </div>
    </div>
  );
}
