"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// This would also come from an API
const ticketListings = [
  { id: 1, section: "General Admission", price: 150, seller: "JohnDoe" },
  { id: 2, section: "VIP", price: 300, seller: "JaneSmith" },
  { id: 3, section: "Front Row", price: 500, seller: "RockFan123" },
];

export default function TicketTabs() {
  const [activeTab, setActiveTab] = useState("buy");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buy">Buy Tickets</TabsTrigger>
        <TabsTrigger value="sell">Sell Tickets</TabsTrigger>
      </TabsList>
      <TabsContent value="buy">
        <Card>
          <CardHeader>
            <CardTitle>Available Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            {ticketListings.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div>
                  <h3 className="font-semibold">{ticket.section}</h3>
                  <p className="text-sm text-gray-600">
                    Seller: {ticket.seller}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-4">${ticket.price}</span>
                  <Button>Buy Now</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sell">
        <Card>
          <CardHeader>
            <CardTitle>Sell Your Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="section"
                  className="block text-sm font-medium text-gray-700"
                >
                  Section
                </label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <Button type="submit" className="w-full">
                List Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
