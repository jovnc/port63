require("dotenv").config();
const { ethers } = require("ethers");

console.log("Using RPC URL:", process.env.ARBITRUM_TESTNET_RPC);

const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_TESTNET_RPC);

async function main() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log("✅ Successfully connected! Latest Block:", blockNumber);
    } catch (error) {
        console.error("❌ Connection failed:", error);
    }
}

main();
