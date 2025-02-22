import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Lock, RefreshCcw, Ticket, Users } from 'lucide-react'
import Link from "next/link"

export default function page() {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center ">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Secure Ticket Transactions with Blockchain
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  SecureaTix is a peer-to-peer marketplace for buying and selling tickets, powered by blockchain technology for ultimate security and transparency.
                </p>
              </div>
              <div className="space-x-4">
              <Button asChild>
                  <Link href="/dashboard">
                  Get Started
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#features">
                  Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-slide-in">
                <CardHeader>
                  <Lock className="w-8 h-8 mb-2" />
                  <CardTitle>Secure Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All ticket transactions are secured by blockchain technology, ensuring authenticity and preventing fraud.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="animate-slide-in">
                <CardHeader>
                  <Users className="w-8 h-8 mb-2" />
                  <CardTitle>Peer-to-Peer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Connect directly with other ticket buyers and sellers, eliminating middlemen and reducing fees.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="animate-slide-in">
                <CardHeader>
                  <RefreshCcw className="w-8 h-8 mb-2" />
                  <CardTitle>Transparent History</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    View the complete transaction history of each ticket, ensuring its legitimacy and origin.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">1. Create an Account</h3>
                <p className="text-gray-500 dark:text-gray-400">Sign up and verify your identity to start using SecureaTix.</p>
                <h3 className="text-xl font-bold">2. List or Browse Tickets</h3>
                <p className="text-gray-500 dark:text-gray-400">Sell your tickets or browse available events and tickets.</p>
                <h3 className="text-xl font-bold">3. Secure Transaction</h3>
                <p className="text-gray-500 dark:text-gray-400">Complete the purchase using our blockchain-powered secure transaction system.</p>
                <h3 className="text-xl font-bold">4. Enjoy the Event</h3>
                <p className="text-gray-500 dark:text-gray-400">Receive your verified ticket and enjoy your event with peace of mind.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join SecureaTix today and experience the future of ticket transactions.
                </p>
              </div>
              <Button asChild>
                  <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>
    </div>
  )
}
