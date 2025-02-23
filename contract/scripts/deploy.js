require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy TicketNFT
    const TicketNFT = await ethers.getContractFactory("TicketNFT");
    const ticketNFT = await TicketNFT.deploy(deployer.address);
    await ticketNFT.waitForDeployment();
    console.log("✅ TicketNFT deployed to:", await ticketNFT.getAddress());

    // Deploy ConcertFactory
    const ConcertFactory = await ethers.getContractFactory("ConcertFactory");
    const concertFactory = await ConcertFactory.deploy();
    await concertFactory.waitForDeployment();
    console.log("✅ ConcertFactory deployed to:", await concertFactory.getAddress());

    // Deploy Concert (Pass required arguments)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const oneWeekFromNow = currentTimestamp + (7 * 24 * 60 * 60);
    const totalTickets = 100;

    const Concert = await ethers.getContractFactory("Concert");
    const concert = await Concert.deploy(oneWeekFromNow, totalTickets);
    await concert.waitForDeployment();
    console.log("✅ Concert deployed to:", await concert.getAddress());

    // ✅ Deploy Ticket (Pass required arguments)
    const ticketName = "VIP Ticket"; // Example: name of the ticket
    const ticketSymbol = "VIP"; // Example: ticket symbol
    const buyerCUID = "buyer_123"; // Example: unique buyer ID

    const Ticket = await ethers.getContractFactory("Ticket");
    const ticket = await Ticket.deploy(ticketName, ticketSymbol, buyerCUID); // ✅ Now passing correct arguments
    await ticket.waitForDeployment();
    console.log("✅ Ticket deployed to:", await ticket.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
