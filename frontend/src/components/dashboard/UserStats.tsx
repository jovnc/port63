"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket, DollarSign } from "lucide-react"

interface Ticket {
  id: string
  eventName: string
  date: string
}

export function UserStats() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [balance, setBalance] = useState(150.75)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-6 w-6" />
              Your Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tickets.length === 0 && (
                <li className="text-center text-muted-foreground text-sm">You have no tickets yet.</li>
              )}
              {tickets.map((ticket) => (
                <motion.li
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-between items-center bg-secondary rounded-md p-2"
                >
                  <span>{ticket.eventName}</span>
                  <span className="text-sm text-muted-foreground">{ticket.date}</span>
                </motion.li>
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
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Withdrawable Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="text-2xl font-bold text-center"
            >
              ${balance.toFixed(2)}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

