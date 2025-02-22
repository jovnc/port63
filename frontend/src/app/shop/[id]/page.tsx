import TicketTabs from "@/components/shop/TicketTabs";
import { getConcertById } from "@/actions/concerts";
import NotFound from "@/app/not-found";
import { Concert } from "@/types/concert";
import ConcertPageCard from "@/components/shop/ConcertPageCard";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const concertData = await getConcertById(id);

  if (!concertData) {
    return <NotFound />;
  }

  const concert = concertData.concert as Concert;

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <ConcertPageCard concert={concert} />
      <TicketTabs />
    </div>
  );
}
