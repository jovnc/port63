"use client";

import { useState } from "react";
import * as z from "zod";
import { Loader, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LoadingPopup } from "../concert/LoadingPopUp";
import { Card } from "../ui/card";
import { createTicket, createTicketContract } from "@/actions/ticket";

export function BuyTicketForm({
  name,
  price,
  buyerCUID,
  concertAddress,
  concertId,
}: {
  name: string;
  price: number;
  buyerCUID: string;
  concertAddress: string;
  concertId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [stages, setStages] = useState<
    { name: string; status: "pending" | "in-progress" | "completed" }[]
  >([
    { name: "Simulating payment in fiat ($)", status: "pending" },
    { name: "Creating ticket contract", status: "pending" },
    { name: "Saving ticket details", status: "pending" },
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

  async function onSubmit() {
    setIsLoading(true);
    resetStages();

    // Stage 1: Process payment for user
    updateStage(0, "in-progress");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    updateStage(0, "completed");

    // Stage 2: Mint ticket for user
    updateStage(1, "in-progress");
    const ticketAddress = await createTicketContract({
      name: name,
      concertAddress: concertAddress,
      buyerCUID: buyerCUID,
    });

    updateStage(1, "completed");

    // Stage 3: Add to database
    updateStage(2, "in-progress");
    const ticket = await createTicket({
      smartContractAddress: ticketAddress,
      concertId: concertId,
      ownerId: buyerCUID,
    });

    updateStage(2, "completed");

    toast({
      title: "Ticket created",
      description: "Your new ticket has been successfully created.",
    });

    setIsLoading(false);
  }

  return (
    <>
      <Card className="space-y-4 flex flex-col items-center gap-4 p-4">
        <p className="text-lg font-semibold">Buy Ticket</p>
        <div className="flex gap-2 flex-row w-full justify-between items-center">
          <div>
            <p className="text-md font-semibold">Concert Ticket</p>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <p className="font-bold text-sm">General Admission Ticket</p>
          <p className="text-sm text-muted-foreground">
            Price: ${price.toFixed(2)}
          </p>
          <Button type="submit" disabled={isLoading} onClick={onSubmit}>
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShoppingCart className="mr-2 h-4 w-4" />
            )}
            Buy
          </Button>
        </div>
      </Card>
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
