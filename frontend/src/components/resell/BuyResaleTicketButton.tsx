"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { buyResaleTicket } from "@/actions/ticket";
import { LoadingPopup } from "../concert/LoadingPopUp";

interface BuyResaleTicketButtonProps {
  ticketAddress: string;
  price: number;
  userId: string;
}

export default function BuyResaleTicketButton({
  ticketAddress,
  price,
  userId,
}: BuyResaleTicketButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [stages, setStages] = useState<
    { name: string; status: "pending" | "in-progress" | "completed" }[]
  >([
    { name: "Simulating fiat ($) payment", status: "pending" },
    { name: "Performing transaction", status: "pending" },
  ]);

  const updateStage = (
    index: number,
    status: "pending" | "in-progress" | "completed"
  ) => {
    setStages((prevStages) =>
      prevStages.map((stage, i) => (i === index ? { ...stage, status } : stage))
    );
  };

  const resetStages = () => {
    setStages(stages.map((stage) => ({ ...stage, status: "pending" })));
  };

  const handleBuy = async () => {
    setIsLoading(true);
    resetStages();

    try {
      updateStage(0, "in-progress");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      updateStage(0, "completed");

      updateStage(1, "in-progress");
      const result = await buyResaleTicket({
        ticketAddress,
        price,
        newBuyerCUID: userId,
      });
      updateStage(1, "completed");

      toast({
        title: "Success",
        description: "Ticket purchased successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to purchase ticket",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className="w-1/2" onClick={handleBuy} disabled={isLoading}>
        {isLoading ? "Processing..." : `Buy`}
      </Button>
      <LoadingPopup
        isOpen={isLoading}
        stages={stages}
        onClose={() => {
          setIsLoading(false);
          resetStages();
        }}
      />
    </>
  );
}
