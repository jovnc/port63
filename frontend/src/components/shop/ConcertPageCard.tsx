import { Calendar, MapPin, Music } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Concert } from "@/types/concert";

export default function ConcertPageCard({ concert }: { concert: Concert }) {
  return (
    <Card className="mb-8">
      <img
        src={concert.imageUrl || "/placeholder.svg"}
        alt={concert.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <CardHeader>
        <CardTitle className="text-3xl">{concert.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{concert.date.toDateString()}</span>
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
      </CardContent>
    </Card>
  );
}
