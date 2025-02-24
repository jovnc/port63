import { ethers } from "ethers";

// Define the network information
const xrplEvmSidechainDevnet = {
  chainId: 1440002,
  name: "XRPL EVM Sidechain Devnet",
  nativeCurrency: {
    name: "XRP",
    symbol: "XRP",
    decimals: 18,
  },
  rpcUrl: "https://rpc-evm-sidechain.xrpl.org",
  blockExplorerUrl: "https://evm-sidechain.xrpl.org",
};

// Create a provider
const provider = new ethers.JsonRpcProvider(xrplEvmSidechainDevnet.rpcUrl, {
  chainId: xrplEvmSidechainDevnet.chainId,
  name: xrplEvmSidechainDevnet.name,
});

// Optionally, if you need to sign transactions, load your private key from your .env file
const PRIVATE_KEY: string = process.env.WALLET_PRIVATE_KEY as string;
const signer: ethers.Wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Now, you can use `provider` and `signer` to interact with smart contracts on the Arbitrum testnet.
// Example: getting the network information to verify connection.
async function checkNetwork(): Promise<void> {
  const network: ethers.Network = await provider.getNetwork();
  console.log("Connected network:", network);
}

checkNetwork();

// Example: using the signer to send a simple transaction
async function sendTransaction(
  recipient: string,
  amountInEther: string
): Promise<void> {
  const tx: ethers.TransactionResponse = await signer.sendTransaction({
    to: recipient,
    value: ethers.parseEther(amountInEther),
  });
  console.log("Transaction:", tx);
}

// Export provider and signer for use in your application
export { provider, signer };
