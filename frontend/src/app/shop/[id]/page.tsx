import { getConcertById } from "@/actions/concerts";
import NotFound from "@/app/not-found";
import { Concert } from "@/types/concert";
import ConcertPageCard from "@/components/shop/ConcertPageCard";
import { BuyTicketForm } from "@/components/shop/BuyTicketForm";
import { auth } from "@/auth";
import ResellLink from "@/components/shop/ResellLink";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const concertData = await getConcertById(id);

  if (!concertData) {
    return <NotFound />;
  }

  const user = await auth();
  const userId = user?.user?.id as string;

  const concert = concertData.concert as Concert;

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <ConcertPageCard concert={concert} />
      <BuyTicketForm
        name={concert.name}
        price={concert.price}
        buyerCUID={userId}
        concertAddress={concert.smartContractAddress}
        concertId={concert.id}
      />
      <ResellLink id={concert.id} />
    </div>
  );
}
