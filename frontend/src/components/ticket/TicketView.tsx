import { Ticket } from "@/types/ticket";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { isSelling, isTicketClaimed } from "@/actions/ticket";
import { SellForm } from "./SellForm";
import { CancelTicketListing } from "./CancelTicketListing";

export default async function TicketView({
  ticket,
  userId,
}: {
  ticket: Ticket;
  userId: string;
}) {
  const isClaimed = await isTicketClaimed({
    ticketAddress: ticket.smartContractAddress,
  });

  const onSale = await isSelling({
    ticketAddress: ticket.smartContractAddress,
  });

  return (
    <Card className="w-full overflow-hidden border shadow-sm">
      <CardContent className="p-0">
        <div className="flex h-30 items-center">
          {/* Ticket details section */}
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-sm truncate">
              {ticket.concert.name}
            </h3>
            <div className="mt-1 space-y-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{ticket?.concert?.date?.toDateString()}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                <span className="truncate">{ticket.concert.location}</span>
              </div>
            </div>
          </div>

          <div className="mr-6">
            <Button size="sm" variant="outline" className="text-xs" asChild>
              <Link href={`/ticket/${ticket.id}`}>View</Link>
            </Button>
          </div>

          {/* Vertical separator */}
          <Separator orientation="vertical" className="h-16" />

          {/* Sell button section */}

          <div className="p-4 text-center w-40">
            {isClaimed ? (
              <div className="text-sm font-bold text-red-500">CLAIMED</div>
            ) : onSale ? (
              <div>
                <div className="text-sm font-bold text-yellow-500">
                  ON ESCROW
                </div>
                <CancelTicketListing
                  userId={userId}
                  ticketAddress={ticket.smartContractAddress}
                />
              </div>
            ) : (
              <SellForm
                userId={userId}
                ticketAddress={ticket.smartContractAddress}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
