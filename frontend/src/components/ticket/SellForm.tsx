"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { sellTicket } from "@/actions/ticket";
import { LoadingPopup } from "../concert/LoadingPopUp";

// Form schema with validation
const sellFormSchema = z.object({
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Invalid price",
  }),
});

type SellFormValues = z.infer<typeof sellFormSchema>;

export function SellForm({
  ticketAddress,
  userId,
}: {
  ticketAddress: string;
  userId: string;
}) {
  // Initialize form with react-hook-form
  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      price: "0",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [stages, setStages] = useState<
    { name: string; status: "pending" | "in-progress" | "completed" }[]
  >([{ name: "Putting Ticket on Sale", status: "pending" }]);

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

  // Form submission handler
  async function handleSubmit(data: SellFormValues) {
    setIsLoading(true);
    resetStages();
    try {
      updateStage(0, "in-progress");

      const res = await sellTicket({
        userId: userId,
        ticketAddress: ticketAddress,
        price: Number(data.price),
      });

      updateStage(0, "completed");
    } catch (error) {
      toast({
        description: "Failed to sell ticket",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormControl>
                <div className="flex items-center">
                  <span className="text-sm mr-1">$</span>
                  <Input
                    {...field}
                    className="h-8 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-[10px]" />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="w-full text-xs">
          Sell
        </Button>
      </form>
      <LoadingPopup
        isOpen={isLoading}
        stages={stages}
        onClose={() => {
          setIsLoading(false);
          resetStages();
        }}
      />
    </Form>
  );
}
