import { getConcertById, getTicketsOnResale } from "@/actions/concerts";
import NotFound from "@/app/not-found";
import ResaleCard from "@/components/resell/ResaleCard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResaleMarketplace({ params }: PageProps) {
  const { id } = await params;
  const concert = await getConcertById(id);

  if (!concert) {
    return <NotFound />;
  }

  const address = concert.concert?.smartContractAddress as string;

  const tickets = await getTicketsOnResale({
    concertAddress: address,
  });

  return (
    <div className="mx-10 my-10 flex flex-col items-center justify-center gap-4">
      <div className="mb-8 flex flex-col justify-between mt-16">
        <h1 className="text-center text-3xl font-bold">Resale Marketplace</h1>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl font-medium">No tickets available for resale</p>
          <p className="text-muted-foreground mt-2">
            Check back later or visit the main ticket shop
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-4xl">
          {tickets.map((ticket) => (
            <ResaleCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
