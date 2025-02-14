require("dotenv").config();
const { ethers } = require("hardhat");  // Ensure ethers is imported from Hardhat

async function main() {
    const [deployer] = await ethers.getSigners(); // Ensure getSigners() works

    console.log("Deploying contracts with the account:", deployer.address);

    const TicketNFT = await ethers.getContractFactory("TicketNFT");
    const ticketNFT = await TicketNFT.deploy(deployer.address);  // Pass address to constructor

    await ticketNFT.waitForDeployment();

    console.log("✅ TicketNFT deployed to:", await ticketNFT.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
