import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Music } from "lucide-react";
import { Concert } from "@/types/concert";
import Image from "next/image";

export function ConcertCard({ concert }: { concert: Concert }) {
  return (
    <Card key={concert.id} className="overflow-hidden">
      <Image
        src={concert.imageUrl || "/placeholder.svg"}
        alt={concert.name}
        className="w-full h-48 object-cover"
        width={800}
        height={400}
      />
      <CardHeader>
        <CardTitle>{concert.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{concert.date.toISOString()}</span>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{concert.location}</span>
        </div>
        <div className="flex items-center">
          <Music className="w-4 h-4 mr-2" />
          <span className="text-sm">{concert.genre}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/shop/${concert.id}`} passHref>
          <Button className="w-full">View Tickets</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
