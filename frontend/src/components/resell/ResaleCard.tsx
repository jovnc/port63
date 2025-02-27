import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ExternalLink, MapPin, Tag } from "lucide-react";
import BuyResaleTicketButton from "@/components/resell/BuyResaleTicketButton";
import { Ticket } from "@/types/ticket";
import Link from "next/link";
import { getPrice } from "@/actions/ticket";
import { auth } from "@/auth";

export default async function ResaleCard({ ticket }: { ticket: Ticket }) {
  const blockURL = process.env.XRP_EVM_BLOCK_EXPLORER as string;
  const blockExplorerURL = `${blockURL}/address/${ticket.smartContractAddress}`;

  const price = await getPrice({ ticketAddress: ticket.smartContractAddress });

  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Card key={ticket.id} className="w-full">
      <div className="flex flex-row items-center">
        <div className="flex-1">
          <CardHeader>
            <CardTitle className="text-xl">{ticket.concert.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(ticket.concert.date!).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{ticket.concert.location}</span>
              </div>
            </div>
            <Link
              className="text-muted-foreground text-sm mt-6 group-hover:text-white transition-colors"
              href={blockExplorerURL}
              target="_blank"
            >
              View on Block Explorer <ExternalLink className="w-4 h-4 inline" />
            </Link>
          </CardContent>
        </div>

        <div className="pr-6 w-48 flex flex-col items-end gap-4">
          <div className="flex items-center gap-2 text-md font-bold">
            <Tag className="h-4 w-4" />
            <span>${price || 0}</span>
          </div>
          <BuyResaleTicketButton
            ticketAddress={ticket.smartContractAddress}
            price={price || 0}
            userId={userId as string}
          />
        </div>
      </div>
    </Card>
  );
}
