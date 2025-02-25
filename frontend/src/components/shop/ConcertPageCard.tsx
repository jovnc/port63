import { Calendar, ExternalLink, MapPin, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Concert } from "@/types/concert";
import Image from "next/image";
import Link from "next/link";

export default function ConcertPageCard({ concert }: { concert: Concert }) {
  const ticketPrice = concert.price?.toFixed(2);
  const blockURL = process.env.XRP_EVM_BLOCK_EXPLORER as string;
  const blockExplorerURL = `${blockURL}/address/${concert.smartContractAddress}`;

  return (
    <Card className="mb-8">
      <Image
        src={concert.imageUrl || "/placeholder.svg"}
        alt={concert.name}
        className="w-full h-64 object-cover rounded-lg"
        width={800}
        height={400}
      />
      <CardHeader>
        <CardTitle className="text-3xl">{concert.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{concert.date?.toDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{concert.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Music className="w-5 h-5 mr-2" />
            <span>{concert.genre}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm">{concert.description}</p>
        <p className="font-bold text-md mt-8">Ticket Price: ${ticketPrice}</p>
        <p className="text-muted-foreground text-sm mt-8">
          Smart Contract Address: {concert.smartContractAddress}
        </p>
        <Link
          className="text-muted-foreground text-sm mt-6"
          href={blockExplorerURL}
          target="_blank"
        >
          View on Block Explorer <ExternalLink className="w-4 h-4 inline" />
        </Link>
      </CardContent>
    </Card>
  );
}
