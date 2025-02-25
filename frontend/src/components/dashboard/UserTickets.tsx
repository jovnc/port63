"use client";

import { Ticket } from "@/types/ticket";
import { motion } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UserTickets({ ticket }: { ticket: Ticket }) {
  return (
    <motion.li
      key={ticket.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center rounded-md p-4 border "
    >
      <span>{ticket.concert.name}</span>
      <span className="text-sm text-muted-foreground">
        {ticket.concert.date?.toDateString()}
      </span>
      <Button variant="outline" asChild>
        <Link href={`/ticket/${ticket.id}`}>View</Link>
      </Button>
    </motion.li>
  );
}
