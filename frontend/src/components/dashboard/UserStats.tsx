"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket as TicketIcon } from "lucide-react";
import WithdrawCard from "./WithdrawCard";
import UserTickets from "./UserTickets";
import { Ticket } from "@/types/ticket";

export function UserStats({
  balance,
  userId,
  tickets,
}: {
  balance: number;
  userId: string;
  tickets: Ticket[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TicketIcon className="h-6 w-6" />
              Your Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tickets.length === 0 && (
                <li
                  className="text-center text-muted-foreground text-sm"
                  key="0"
                >
                  You have no tickets yet.
                </li>
              )}
              {tickets.map((ticket) => (
                <UserTickets ticket={ticket} key={ticket.id} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <WithdrawCard balance={balance} userId={userId} />
      </motion.div>
    </div>
  );
}
