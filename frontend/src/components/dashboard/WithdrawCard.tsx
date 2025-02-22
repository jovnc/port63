import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import WithdrawButton from "./WithdrawButton";

export default function WithdrawCard({
  balance,
  userId,
}: {
  balance: number;
  userId: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6" />
          Withdrawable Balance
        </CardTitle>
        <p className="text-muted-foreground text-xs">
          This is your withdrawable balance from sales in resell market
        </p>
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
        <div className="w-full flex justify-center mt-2">
          <WithdrawButton balance={balance} userId={userId} />
        </div>
      </CardContent>
    </Card>
  );
}
