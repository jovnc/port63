import { Ticket } from "@/types/ticket";
import { Card } from "../ui/card";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  const blockURL = process.env.XRP_EVM_BLOCK_EXPLORER as string;
  const blockExplorerURL = `${blockURL}/address/${ticket.smartContractAddress}`;
  return (
    <div className="mx-20">
      <Card className="p-8 bg-gradient-to-r from-gray-900 to-blue-900 bg-opacity-5 flex flex-col items-center gap-4 text-white shine-effect relative overflow-hidden hover:shadow-2xl">
        <h2 className="text-xl font-bold text-center">
          {ticket?.concert?.name}
        </h2>
        <p className="text-lg font-bold">General Admission Ticket</p>
        <p className="text-xs">Owner ID: {ticket.ownerId}</p>
        <p className="font-bold">${ticket.concert.price?.toFixed(2)} </p>
        <Link
          className="text-muted-foreground text-sm mt-6"
          href={blockExplorerURL}
          target="_blank"
        >
          View on Block Explorer <ExternalLink className="w-4 h-4 inline" />
        </Link>
      </Card>
    </div>
  );
}
