"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card" 
import { ArrowRight, Ticket } from "lucide-react";
import { Button } from "../ui/button";
import { concerts } from "@/data/concerts";
import Link from "next/link";




export default function UpcomingConcerts() {
  return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upcoming Concerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {concerts.map(concert => (
                <div key={concert.id} className="flex items-center">
                  <Ticket className="h-9 w-9 text-primary" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{concert.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {concert.date} at {concert.venue}
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
