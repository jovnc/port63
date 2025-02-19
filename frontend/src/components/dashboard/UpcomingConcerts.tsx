import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "../ui/button";
// import { concerts } from "@/data/concerts";
import Link from "next/link";
import { getUpcomingConcerts } from "@/actions/concerts";

export default async function UpcomingConcerts() {

  const concerts = await getUpcomingConcerts();

  return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upcoming Concerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {concerts.length === 0 && (
                <p className="text-muted-foreground text-sm">No upcoming concerts</p>
              )}
              {concerts.map(concert => (
                <div key={concert.id} className="flex items-center">
                  <Ticket className="h-9 w-9 text-primary" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{concert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {concert.date?.toDateString()} at {concert.location}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Button variant="ghost" asChild>
                      <Link href={`/shop/${concert.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
  )
}
